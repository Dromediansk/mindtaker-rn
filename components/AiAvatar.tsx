import { Pressable, Image, View } from "react-native";
import React, { FC, useRef } from "react";
import ContextMenu from "react-native-context-menu-view";
import LottieView from "lottie-react-native";
import { AiIdeaAction } from "@/utils/types";

type AiAvatarProps = {
  onPressOption: (action: AiIdeaAction) => void;
  isLoading: boolean;
};

const AiAvatar: FC<AiAvatarProps> = ({ isLoading, onPressOption }) => {
  const animation = useRef<LottieView>(null);

  return (
    <ContextMenu
      actions={[{ title: "Expand" }, { title: "Summarize" }]}
      onPress={(e) => {
        const { name } = e.nativeEvent;
        if (name === "Expand") {
          onPressOption("expand");
        } else if (name === "Summarize") {
          onPressOption("summarize");
        }
      }}
      dropdownMenuMode
      style={{ position: "absolute", bottom: 24, right: 24 }}
    >
      {isLoading && (
        <View className="flex-1 items-center justify-center absolute -right-10 bottom-6">
          <LottieView
            autoPlay
            ref={animation}
            loop
            style={{
              backgroundColor: "transparent",
              width: 80,
              height: 80,
            }}
            source={require("../assets/animations/thinking.json")}
          />
        </View>
      )}
      <Pressable
        className={`${isLoading ? "opacity-75" : ""}`}
        disabled={isLoading}
      >
        <Image
          source={require("@/assets/images/ai-avatar.png")}
          className="w-16 h-16 rounded-full"
        />
      </Pressable>
    </ContextMenu>
  );
};

export default AiAvatar;
