import IdeaItem from "@/components/IdeaItem";
import { ideaItemsMock } from "@/utils/mocks";
import dayjs from "dayjs";
import React, { useCallback, useState } from "react";
import { FlatList } from "react-native";
import {
  CalendarProvider,
  DateData,
  ExpandableCalendar,
} from "react-native-calendars";

const initialDate = dayjs().format("YYYY-MM-DD");

const HomeTab = () => {
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const handleDateChange = (date: DateData) => {
    setSelectedDate(date.dateString);
  };

  const renderItem = useCallback(({ item }: { item: Idea }) => {
    return <IdeaItem item={item} />;
  }, []);

  return (
    <CalendarProvider date={selectedDate} showTodayButton>
      <ExpandableCalendar
        firstDay={1}
        onDayPress={handleDateChange}
        allowShadow
      />
      <FlatList
        data={ideaItemsMock}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerClassName="gap-2"
      />
    </CalendarProvider>
  );
};

export default HomeTab;
