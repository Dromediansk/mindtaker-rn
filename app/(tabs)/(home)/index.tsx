import IdeaItem from "@/components/IdeaItem";
import dayjs from "dayjs";
import React, { useCallback, useState, useEffect, useMemo } from "react";
import {
  View,
  SectionList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import { Link } from "expo-router";
import { StyledText } from "@/components/StyledText";
import { useCategoryStore } from "@/store/category.store";
import { Category, Idea } from "@/utils/types";
import { getCategoriesFromDb } from "@/utils/queries";
import { cssInterop } from "nativewind";
import { calendarTheme, COLORS } from "@/utils/theme";
import ListSkeleton from "@/components/ListSkeleton";
import { LinearGradient } from "expo-linear-gradient";
import { StyledButton } from "@/components/StyledButton";
import { SafeAreaView } from "react-native-safe-area-context";

type Section = {
  category: Category;
  data: Idea[];
};

cssInterop(ActivityIndicator, {
  className: {
    target: "style",
    nativeStyleToProp: { color: true, fontSize: "size" },
  },
});

cssInterop(Ionicons, {
  className: {
    target: "style",
    nativeStyleToProp: { color: true, fontSize: "size" },
  },
});

const renderSectionHeader = ({
  section: { category, data },
}: {
  section: Section;
}) => (
  <LinearGradient
    colors={[COLORS.main_dark, COLORS.main]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    className="rounded-lg py-3 px-4 mx-2 mb-2 flex-row justify-between items-center"
  >
    <StyledText className="text-white text-xl font-workSans-semibold">
      {category.name}
    </StyledText>
    <View className="bg-white/20 rounded-full px-3 py-1">
      <StyledText className="text-white text-sm font-workSans-semibold">
        {data.length}
      </StyledText>
    </View>
  </LinearGradient>
);

const EmptyListComponent = () => (
  <View className="flex-1 items-center justify-center p-8">
    <StyledText className="text-gray-500 text-lg text-center">
      No ideas yet for this date. Start capturing your thoughts!
    </StyledText>
  </View>
);

const IdeasScreen = () => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [layoutReady, setLayoutReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { categoryMap, setCategoriesToMap, clearCategoryMap } =
    useCategoryStore();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        clearCategoryMap();
        const categoriesData = await getCategoriesFromDb(selectedDate);

        setCategoriesToMap(categoriesData);
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [clearCategoryMap, selectedDate, setCategoriesToMap]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      clearCategoryMap();
      const categoriesData = await getCategoriesFromDb(selectedDate);
      setCategoriesToMap(categoriesData);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, [clearCategoryMap, selectedDate, setCategoriesToMap]);

  const sections = useMemo(() => {
    return Object.values(categoryMap)
      .filter((category) => category.ideas.length > 0)
      .map(
        (category): Section => ({
          category,
          data: category.ideas.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          ),
        })
      );
  }, [categoryMap]);

  const renderItem = ({ item: idea }: { item: Idea }) => (
    <IdeaItem item={idea} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <CalendarProvider
        date={selectedDate}
        onDateChanged={(date) => setSelectedDate(date)}
        showTodayButton
      >
        <View onLayout={() => setLayoutReady(true)}>
          {layoutReady && (
            <ExpandableCalendar
              firstDay={1}
              allowShadow
              theme={calendarTheme}
            />
          )}
        </View>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          {isLoading ? (
            <ListSkeleton />
          ) : (
            <SectionList
              sections={sections}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              ListEmptyComponent={EmptyListComponent}
              keyExtractor={(item) => item.id}
              stickySectionHeadersEnabled
              contentContainerClassName="gap-2 pb-56"
              maxToRenderPerBatch={10}
              updateCellsBatchingPeriod={50}
              initialNumToRender={8}
              windowSize={5}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
                  colors={[COLORS.main]}
                  tintColor={COLORS.main}
                />
              }
            />
          )}
        </View>

        <Link asChild href="/ideas/new">
          <StyledButton
            text="new"
            className="w-40 absolute bottom-6 left-1/2 -translate-x-1/2"
            icon={
              <Ionicons name="bulb-outline" className="text-white text-2xl" />
            }
          />
        </Link>
      </CalendarProvider>
    </SafeAreaView>
  );
};

export default IdeasScreen;
