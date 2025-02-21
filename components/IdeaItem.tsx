import React from "react";
import { Pressable } from "react-native";
import { StyledText } from "./StyledText";
import { router } from "expo-router";
import { Idea } from "@/utils/types";

interface IdeaItemProps {
  item: Idea;
}

const IdeaItem = ({ item }: IdeaItemProps) => {
  return (
    <Pressable
      className="bg-white p-4 mx-4 rounded-lg"
      onPress={() => router.push(`/ideas/${item.id}`)}
    >
      <StyledText className="text-lg">{item.title}</StyledText>
      <StyledText numberOfLines={2}>{item.description}</StyledText>
    </Pressable>
  );
};

export default IdeaItem;
