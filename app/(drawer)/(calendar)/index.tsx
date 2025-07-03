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
import { getCategoriesFromDb, getIdeasFromDb } from "@/utils/queries";
import { cssInterop } from "nativewind";
import { calendarTheme, COLORS } from "@/utils/theme";
import ListSkeleton from "@/components/ListSkeleton";
import { LinearGradient } from "expo-linear-gradient";
import { StyledButton } from "@/components/StyledButton";

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
    className="px-4 py-3 shadow-sm"
  >
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-2">
        <Ionicons
          name={category.is_category_none ? "folder-outline" : "folder"}
          className="text-white text-2xl"
        />
        <StyledText className="text-xl text-white font-bold shadow-sm">
          {category.name}
        </StyledText>
      </View>
      <View className="bg-white/20 px-2.5 py-1 rounded-full">
        <StyledText className="text-sm text-white font-medium">
          {data.length} {data.length === 1 ? "idea" : "ideas"}
        </StyledText>
      </View>
    </View>
  </LinearGradient>
);

const EmptyListComponent = () => (
  <View className="justify-center items-center py-4">
    <StyledText className="text-lg text-gray-500">
      No idea for this day noted
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
  const {
    categoryMap,
    setCategoriesToMap,
    setIdeasToCategory,
    clearCategoryMap,
  } = useCategoryStore();

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

  const sections = useMemo(() => {
    return Object.values(categoryMap).reduce<Section[]>((acc, category) => {
      if (category.ideas && category.ideas.length > 0) {
        acc.push({
          category: {
            id: category.id,
            name: category.name,
            is_category_none: category.is_category_none,
          },
          data: category.ideas,
        });
      }
      return acc;
    }, []);
  }, [categoryMap]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const ideasData = await getIdeasFromDb(selectedDate);
      setIdeasToCategory(ideasData);
    } catch (error) {
      console.error("Error refreshing ideas:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, [selectedDate, setIdeasToCategory]);

  const renderItem = useCallback(
    ({ item }: { item: Idea }) => <IdeaItem item={item} />,
    []
  );

  return (
    <CalendarProvider
      date={selectedDate}
      onDateChanged={(date) => setSelectedDate(date)}
      showTodayButton
    >
      <View onLayout={() => setLayoutReady(true)}>
        {layoutReady && (
          <ExpandableCalendar firstDay={1} allowShadow theme={calendarTheme} />
        )}
      </View>
      <View>
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
  );
};

export default IdeasScreen;
