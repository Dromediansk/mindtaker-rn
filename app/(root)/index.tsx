import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { Calendar, DateData } from "react-native-calendars";

const initialDate = dayjs().format("YYYY-MM-DD");

const HomeTab = () => {
  const [selectedDate, setSelectedDate] = useState(initialDate);

  console.log("selectedDate", selectedDate);

  const handleDateChange = (date: DateData) => {
    setSelectedDate(date.dateString);
  };

  const marked = useMemo(() => {
    return {
      [selectedDate]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: "#2094c3",
        selectedTextColor: "white",
      },
    };
  }, [selectedDate]);

  return (
    <Calendar
      firstDay={1}
      initialDate={selectedDate}
      markedDates={marked}
      horizontal
      pagingEnabled
      enableSwipeMonths
      showSixWeeks
      onDayPress={handleDateChange}
    />
  );
};

export default HomeTab;
