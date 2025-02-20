import IdeaItem from "@/components/IdeaItem";
import { ideaItemsMock } from "@/utils/mocks";
import dayjs from "dayjs";
import React, { useCallback, useState } from "react";
import { View, Text, SectionList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  CalendarProvider,
  DateData,
  ExpandableCalendar,
} from "react-native-calendars";
import { router } from "expo-router";

const initialDate = dayjs().format("YYYY-MM-DD");

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(initialDate);

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
            <Text className="text-2xl px-4 pt-2 pb-1">{category.name}</Text>
          )}
          keyExtractor={(item) => item.id}
          contentContainerClassName="gap-2"
        />
        <Pressable
          className="absolute bottom-6 right-6 bg-main w-14 h-14 rounded-full items-center justify-center shadow-lg"
          onPress={() => router.navigate("new-idea")}
          hitSlop={15}
        >
          <Ionicons name="add" size={30} color="white" />
        </Pressable>
      </View>
    </CalendarProvider>
  );
};

export default Calendar;
