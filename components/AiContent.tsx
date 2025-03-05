import { ScrollView, View } from "react-native";
import React, { FC, useState } from "react";
import AiAvatar from "./AiAvatar";
import { API_URL } from "@/utils/constants";
import { StyledText } from "./StyledText";
import { AiIdeaAction } from "@/utils/types";

type AiContentProps = {
  ideaContent: string;
};

const AiContent: FC<AiContentProps> = ({ ideaContent }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const handlePressOption = async (action: AiIdeaAction) => {
    try {
      setIsLoading(true);
      const url = `${API_URL}/idea-action`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          idea_text: ideaContent,
          action,
        }),
      });

      const data = await response.json();
      setAiResponse(data.result);
    } catch (error) {
      console.error("Error expanding idea:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {aiResponse && (
        <View className="flex-1">
          <ScrollView className="h-80 bg-gray-100 rounded-lg m-2 border-2 border-main mb-24">
            <StyledText className="p-5 text-xl font-workSans-light">
              {aiResponse}
            </StyledText>
          </ScrollView>
        </View>
      )}
      <AiAvatar onPressOption={handlePressOption} isLoading={isLoading} />
    </>
  );
};

export default AiContent;
