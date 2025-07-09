import { Stack } from "expo-router";

export default function IdeasLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: "modal",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="ideas/new"
        options={{
          headerShown: true,
          title: "New Idea",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="ideas/[id]"
        options={{
          headerShown: true,
          headerTitle: "",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
