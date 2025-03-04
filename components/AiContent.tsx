import { ScrollView, View } from "react-native";
import React, { FC, useState } from "react";
import AiAvatar from "./AiAvatar";
import { HOST } from "@/utils/constants";
import { StyledText } from "./StyledText";

type AiContentProps = {
  ideaContent: string;
};

const AiContent: FC<AiContentProps> = ({ ideaContent }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const handlePressOption = async (endpoint: string) => {
    try {
      setIsLoading(true);
      const url = `http://${HOST}:8000/${endpoint}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          idea_text: ideaContent,
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
    <View>
      {aiResponse && (
        <ScrollView className="m-2 border-2 border-main mb-24 h-80 p-4 bg-gray-100 rounded-lg">
          <StyledText className="text-xl font-workSans-light">
            {aiResponse}
          </StyledText>
        </ScrollView>
      )}
      <AiAvatar onPressOption={handlePressOption} disabled={isLoading} />
    </View>
  );
};

export default AiContent;
