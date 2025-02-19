import React, { FC } from "react";
import { Text, View } from "react-native";

interface IdeaItemProps {
  item: Idea;
}

const IdeaItem: FC<IdeaItemProps> = ({ item }) => {
  return (
    <View className="bg-white p-5">
      <Text className="text-2xl">{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );
};

export default IdeaItem;
