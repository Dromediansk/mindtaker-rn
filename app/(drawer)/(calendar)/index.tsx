import IdeaItem from "@/components/IdeaItem";
import dayjs from "dayjs";
import React, { useCallback, useState, useEffect, useMemo } from "react";
import {
  View,
  SectionList,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  CalendarProvider,
  DateData,
  ExpandableCalendar,
} from "react-native-calendars";
import { Link } from "expo-router";
import { StyledText } from "@/components/StyledText";
import { useCategoryStore } from "@/store/category.store";
import { Category, Idea } from "@/utils/types";
import { getCategoriesFromDb, getIdeasFromDb } from "@/utils/queries";
import { cssInterop } from "nativewind";
import { COLORS } from "@/utils/theme";
import ListSkeleton from "@/components/ListSkeleton";
import { LinearGradient } from "expo-linear-gradient";

type Section = {
  category: Category;
  data: Idea[];
};

const initialDate = dayjs().format("YYYY-MM-DD");

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
  <View className="flex-1 justify-center items-center">
    <StyledText className="text-lg text-gray-500">
      No idea for this day noted
    </StyledText>
  </View>
);

const IdeasScreen = () => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    categoryMap,
    setCategoriesToMap,
    setIdeasToCategory,
    clearCategoryMap,
  } = useCategoryStore();

  const currentWeekMonday = dayjs(selectedDate).day(1);

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
  }, [selectedDate]);

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

  const handleDateChange = useCallback((date: DateData) => {
    setSelectedDate(date.dateString);
  }, []);

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
  }, [selectedDate]);

  const renderItem = useCallback(
    ({ item }: { item: Idea }) => <IdeaItem item={item} />,
    []
  );

  return (
    <CalendarProvider date={selectedDate} showTodayButton>
      <ExpandableCalendar
        firstDay={1}
        onDayPress={handleDateChange}
        onPressArrowLeft={() => {
          const previousMonday = currentWeekMonday
            .subtract(7, "day")
            .format("YYYY-MM-DD");
          setSelectedDate(previousMonday);
        }}
        onPressArrowRight={() => {
          const nextMonday = currentWeekMonday
            .add(7, "day")
            .format("YYYY-MM-DD");
          setSelectedDate(nextMonday);
        }}
        allowShadow
      />
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
            contentContainerClassName="gap-2 pt-4 pb-56"
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
        <Pressable
          className="absolute bottom-6 right-6 bg-main w-14 h-14 rounded-full items-center justify-center shadow-lg"
          hitSlop={15}
        >
          <Ionicons name="add" size={30} color="white" />
        </Pressable>
      </Link>
    </CalendarProvider>
  );
};

export default IdeasScreen;
