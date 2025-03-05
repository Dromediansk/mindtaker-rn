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
    >
      <View className="relative">
        {isLoading && (
          <View className="absolute right-4 bottom-4 z-10">
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
      </View>
    </ContextMenu>
  );
};

export default AiAvatar;
