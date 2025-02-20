import { StyledText } from "@/components/StyledText";
import { ideaItemsMock } from "@/utils/mocks";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

const IdeaDetail = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const idea = ideaItemsMock
    .flatMap((section) => section.data)
    .find((item) => item.id === id);

  useEffect(() => {
    navigation.setOptions({ title: idea?.title || "Idea Details" });
  }, [idea, navigation]);

  if (!idea) return null;

  return (
    <View className="flex-1 p-4">
      <StyledText className="text-2xl mb-4">{idea.title}</StyledText>
      <StyledText className="text-lg mb-2">Description:</StyledText>
      <StyledText>{idea.description}</StyledText>
    </View>
  );
};

export default IdeaDetail;
