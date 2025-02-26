import { StyledText } from "@/components/StyledText";
import { useCategoryStore } from "@/store/category.store";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

const DetailScreen = () => {
  const { id, categoryId } = useLocalSearchParams<{
    id: string;
    categoryId: string;
  }>();
  const { getIdeasByCategory } = useCategoryStore();

  const ideas = getIdeasByCategory(categoryId);
  const idea = ideas.find((idea) => idea.id === id);

  if (!idea) return null;

  return (
    <ScrollView className="flex-1 bg-white m-2">
      <View className="px-4 py-8">
        <StyledText className="text-2xl text-justify">
          {idea.content}
        </StyledText>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;
