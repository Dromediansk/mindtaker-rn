import React from "react";
import { Stack } from "expo-router";

const CalendarLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="new-idea"
        options={{
          title: "New Idea",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          animation: "slide_from_right",
        }}
      />
    </Stack>
  );
};

export default CalendarLayout;
