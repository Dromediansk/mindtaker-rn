import { ScrollView } from "react-native";
import React, { FC } from "react";
import Markdown from "react-native-markdown-display";

type AiContentProps = {
  aiResponse: string;
};

const AiContent: FC<AiContentProps> = ({ aiResponse }) => {
  if (!aiResponse) return null;

  return (
    <ScrollView className="h-80 bg-gray-100 rounded-lg m-2 border-2 border-main">
      <Markdown
        style={{
          body: {
            paddingHorizontal: 20,
            paddingVertical: 10,
            fontSize: 20,
            fontFamily: "WorkSans-Light",
            color: "#000",
          },
          paragraph: {
            fontSize: 20,
            lineHeight: 28,
            marginBottom: 10,
          },
          strong: {
            fontWeight: "bold",
          },
          em: {
            fontStyle: "italic",
          },
        }}
      >
        {aiResponse}
      </Markdown>
    </ScrollView>
  );
};

export default AiContent;
