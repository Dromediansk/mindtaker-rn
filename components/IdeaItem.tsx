import React from "react";
import { Pressable } from "react-native";
import { StyledText } from "./StyledText";
import { router } from "expo-router";
import { Idea } from "@/utils/types";

interface IdeaItemProps {
  item: Idea;
}

const IdeaItem = ({ item }: IdeaItemProps) => {
  const handlePress = () => {
    if (!item?.id || !item?.category_id) {
      console.warn("Invalid idea data");
      return;
    }
    router.push(`/ideas/${item.id}?categoryId=${item.category_id}`);
  };

  return (
    <Pressable
      className="bg-white p-4 mx-4 rounded-lg border-2 border-transparent active:border-main active:bg-main/10"
      onPress={handlePress}
    >
      <StyledText className="text-gray-600 text-xl" numberOfLines={2}>
        {item.content}
      </StyledText>
    </Pressable>
  );
};

export default React.memo(IdeaItem);
