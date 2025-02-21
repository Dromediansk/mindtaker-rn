import React from "react";
import { Stack } from "expo-router";

const CalendarLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="ideas/new"
        options={{
          title: "New Idea",
          animation: "slide_from_bottom",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name="ideas/[id]"
        options={{
          presentation: "modal",
          animation: "slide_from_right",
        }}
      />
    </Stack>
  );
};

export default CalendarLayout;
