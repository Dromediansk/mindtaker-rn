import { StyledText } from "@/components/StyledText";
import { useCategoryStore } from "@/store/category.store";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

const DetailScreen = () => {
  const { id, categoryId } = useLocalSearchParams<{
    id: string;
    categoryId: string;
  }>();
  const { getIdeasByCategory } = useCategoryStore();
  const navigation = useNavigation();

  const ideas = getIdeasByCategory(categoryId);
  const idea = ideas.find((idea) => idea.id === id);

  useEffect(() => {
    if (idea) {
      navigation.setOptions({ title: idea.title });
    }
  }, [idea, navigation]);

  if (!idea) return null;

  return (
    <View className="flex-1 p-4">
      <StyledText className="text-lg mb-2">Description:</StyledText>
      <StyledText>{idea.description}</StyledText>
    </View>
  );
};

export default DetailScreen;
