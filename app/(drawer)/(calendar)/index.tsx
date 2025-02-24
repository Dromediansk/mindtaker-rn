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

const renderSectionHeader = ({
  section: { category },
}: {
  section: Section;
}) => (
  <StyledText className="text-2xl px-4 pt-2 pb-1">{category.name}</StyledText>
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
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
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
        const [categoriesData, ideasData] = await Promise.all([
          getCategoriesFromDb(null),
          getIdeasFromDb(selectedDate),
        ]);

        setCategoriesToMap(categoriesData);
        setIdeasToCategory(ideasData);
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
    setRefreshing(true);
    try {
      const ideasData = await getIdeasFromDb(selectedDate);
      setIdeasToCategory(ideasData);
    } catch (error) {
      console.error("Error refreshing ideas:", error);
    } finally {
      setRefreshing(false);
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
      <View className="flex-1">
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" className="text-main" />
          </View>
        ) : (
          <SectionList
            sections={sections}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            ListEmptyComponent={EmptyListComponent}
            keyExtractor={(item) => item.id}
            contentContainerClassName="gap-2 flex-1"
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={50}
            initialNumToRender={8}
            windowSize={5}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[COLORS.main]}
                tintColor={COLORS.main}
              />
            }
          />
        )}
        <Link asChild href="/ideas/new">
          <Pressable
            className="absolute bottom-6 right-6 bg-main w-14 h-14 rounded-full items-center justify-center shadow-lg"
            hitSlop={15}
          >
            <Ionicons name="add" size={30} color="white" />
          </Pressable>
        </Link>
      </View>
    </CalendarProvider>
  );
};

export default IdeasScreen;
