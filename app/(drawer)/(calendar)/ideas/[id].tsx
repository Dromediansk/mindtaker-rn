import { StyledText } from "@/components/StyledText";
import { useCategoryStore } from "@/store/category.store";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";

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
    <ScrollView className="flex-1 bg-white m-2">
      <View className="px-4 py-8">
        <StyledText className="text-2xl text-justify">
          {idea.description}
        </StyledText>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;
