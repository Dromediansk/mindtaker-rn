import IdeaItem from "@/components/IdeaItem";
import dayjs from "dayjs";
import React, { useCallback, useState, useEffect, useMemo } from "react";
import { View, SectionList, Pressable } from "react-native";
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
import { getCategoriesFromDb, getIdeasByDate } from "@/utils/queries";

type Section = {
  category: Category;
  data: Idea[];
};

const initialDate = dayjs().format("YYYY-MM-DD");

const IdeasScreen = () => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const { categoryMap, setCategoriesToMap, setIdeasToCategory } =
    useCategoryStore();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [categoriesData, ideasData] = await Promise.all([
          getCategoriesFromDb(null),
          getIdeasByDate(selectedDate),
        ]);

        setCategoriesToMap(categoriesData);
        setIdeasToCategory(ideasData);
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    };

    loadInitialData();
  }, [selectedDate, setCategoriesToMap, setIdeasToCategory]);

  const sections = useMemo(() => {
    return Object.values(categoryMap).reduce<Section[]>((acc, category) => {
      if (category.ideas && category.ideas.length > 0) {
        acc.push({
          category: { id: category.id, name: category.name },
          data: category.ideas,
        });
      }
      return acc;
    }, []);
  }, [categoryMap]);

  const handleDateChange = useCallback((date: DateData) => {
    setSelectedDate(date.dateString);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Idea }) => <IdeaItem item={item} />,
    []
  );

  return (
    <CalendarProvider date={selectedDate} showTodayButton>
      <ExpandableCalendar
        firstDay={1}
        onDayPress={handleDateChange}
        allowShadow
      />
      <View className="flex-1">
        <SectionList
          sections={sections}
          renderItem={renderItem}
          renderSectionHeader={({ section: { category } }) => (
            <StyledText className="text-2xl px-4 pt-2 pb-1">
              {category.name}
            </StyledText>
          )}
          keyExtractor={(item) => item.id}
          contentContainerClassName="gap-2"
        />
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
