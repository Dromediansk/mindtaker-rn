import { Theme } from "react-native-calendars/src/types";

export const COLORS = {
  main: "#61bee4",
  main_lighter: "#dff2f9",
  main_light: "#b5e1f2",
  main_dark: "#2094c3",
  main_darker: "#197499",

  white: "#ffffff",
  black: "#000000",
  gray: "#808080",
};

export const calendarTheme: Theme = {
  monthTextColor: COLORS.main,
  textMonthFontFamily: "WorkSans-SemiBold",
  textDayHeaderFontFamily: "WorkSans-Regular",
  // Arrow styling
  arrowColor: COLORS.main,
  arrowStyle: {
    padding: 8,
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },

  // Header styling
  calendarBackground: "white",

  // Today indicator
  todayButtonTextColor: COLORS.main,
  todayBackgroundColor: `${COLORS.main}20`,

  // Selected date
  selectedDayBackgroundColor: COLORS.main,
  selectedDayTextColor: "white",

  // Regular days
  dayTextColor: "#2d4150",
  textDayFontFamily: "WorkSans-Regular",
};
