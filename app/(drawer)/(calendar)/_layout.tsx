import React from "react";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { deleteIdeaFromDb } from "@/utils/queries";
import { cssInterop } from "nativewind";

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
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="ideas/[id]"
        options={({ route }) => ({
          presentation: "modal",
          animation: "slide_from_right",
          title: "",
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                handleDeleteIdea((route.params as IdeaRouteParams).id)
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
