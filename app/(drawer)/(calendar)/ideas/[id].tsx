import { StyledText } from "@/components/StyledText";
import { ideaItemsMock } from "@/utils/mocks";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

const DetailScreen = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const idea = ideaItemsMock
    .flatMap((section) => section.data)
    .find((item) => item.id === id);

  if (!idea) return null;

  useEffect(() => {
    navigation.setOptions({ title: idea.title });
  }, [idea, navigation]);

  return (
    <View className="flex-1 p-4">
      <StyledText className="text-lg mb-2">Description:</StyledText>
      <StyledText>{idea.description}</StyledText>
    </View>
  );
};

export default DetailScreen;
