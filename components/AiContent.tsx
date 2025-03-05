import { ScrollView, View } from "react-native";
import React, { FC } from "react";
import { StyledText } from "./StyledText";

type AiContentProps = {
  aiResponse: string;
};

const AiContent: FC<AiContentProps> = ({ aiResponse }) => {
  if (!aiResponse) return null;

  return (
    <View className="flex-1">
      <ScrollView className="h-80 bg-gray-100 rounded-lg m-2 border-2 border-main">
        <StyledText className="p-5 text-xl font-workSans-light">
          {aiResponse}
        </StyledText>
      </ScrollView>
    </View>
  );
};

export default AiContent;
