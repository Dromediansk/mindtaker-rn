import React from "react";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { deleteIdeaFromDb } from "@/utils/queries";

type IdeaRouteParams = {
  categoryId: string;
  id: string;
};

const CalendarLayout = () => {
  const handleDeleteIdea = async (id: string) => {
    await deleteIdeaFromDb(id);
    router.back();
  };

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
        options={({ route }) => ({
          presentation: "modal",
          animation: "slide_from_right",
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                handleDeleteIdea((route.params as IdeaRouteParams).id)
              }
            >
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack>
  );
};

export default CalendarLayout;
