import React from "react";
import { Pressable, Platform } from "react-native";
import { StyledText } from "./StyledText";
import { router } from "expo-router";
import { Idea } from "@/utils/types";
import { COLORS } from "@/utils/theme";

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
      className="bg-white p-4 mx-1 rounded-lg active:bg-main/10"
      style={{
        ...Platform.select({
          ios: {
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
          },
          android: {
            elevation: 2,
          },
        }),
      }}
      onPress={handlePress}
    >
      <StyledText className="text-gray-600 text-xl" numberOfLines={2}>
        {item.content}
      </StyledText>
    </Pressable>
  );
};

export default React.memo(IdeaItem);
