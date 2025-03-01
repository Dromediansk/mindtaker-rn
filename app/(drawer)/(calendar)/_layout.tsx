import React from "react";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { deleteIdeaFromDb } from "@/utils/queries";
import { cssInterop } from "nativewind";
import { useCategoryStore } from "@/store/category.store";

type IdeaRouteParams = {
  categoryId: string;
  id: string;
};

cssInterop(Ionicons, {
  className: {
    target: "style",
    nativeStyleToProp: { color: true, fontSize: "size" },
  },
});

const CalendarLayout = () => {
  const { deleteIdeaFromCategory } = useCategoryStore();

  const handleDeleteIdea = async (id: string, categoryId: string) => {
    try {
      await deleteIdeaFromDb(id);
      deleteIdeaFromCategory(id, categoryId);
      router.back();
    } catch (error) {
      console.error("Failed to delete idea:", error);
    }
  };

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="ideas/new"
        options={{
          title: "New Idea",
          presentation: "modal",
          animation: "slide_from_bottom",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="ideas/[id]"
        options={({ route }) => ({
          presentation: "card",
          animation: "slide_from_right",
          headerBackButtonDisplayMode: "minimal",
          title: "",
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                handleDeleteIdea(
                  (route.params as IdeaRouteParams).id,
                  (route.params as IdeaRouteParams).categoryId
                )
              }
            >
              <Ionicons
                name="trash-outline"
                className="text-red-600 text-3xl"
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack>
  );
};

export default CalendarLayout;
