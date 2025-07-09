import { Stack } from "expo-router";

export default function IdeasLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "modal",
      }}
    >
      <Stack.Screen
        name="ideas/new"
        options={{
          title: "New Idea",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="ideas/[id]"
        options={{
          title: "Edit Idea",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
