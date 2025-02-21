import IdeaItem from "@/components/IdeaItem";
import { ideaItemsMock } from "@/utils/mocks";
import dayjs from "dayjs";
import React, { useCallback, useState, useEffect } from "react";
import { View, SectionList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  CalendarProvider,
  DateData,
  ExpandableCalendar,
} from "react-native-calendars";
import { Link } from "expo-router";
import { StyledText } from "@/components/StyledText";
import { useIdeaStore } from "@/store/idea.store";
import { Idea } from "@/utils/types";
import { getCategoriesFromDb } from "@/utils/queries/category.query";

const initialDate = dayjs().format("YYYY-MM-DD");

const IdeasScreen = () => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const { setCategories } = useIdeaStore();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategoriesFromDb();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    loadCategories();
  }, []);

  const handleDateChange = (date: DateData) => {
    setSelectedDate(date.dateString);
  };

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
          sections={ideaItemsMock}
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
