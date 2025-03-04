import { Pressable, Image } from "react-native";
import React, { FC } from "react";
import ContextMenu from "react-native-context-menu-view";

type AiAvatarProps = {
  onPressOption: (endpoint: string) => void;
  disabled: boolean;
};

const AiAvatar: FC<AiAvatarProps> = ({ disabled, onPressOption }) => {
  return (
    <ContextMenu
      actions={[{ title: "Expand" }, { title: "Summarize" }]}
      onPress={(e) => {
        const { name } = e.nativeEvent;
        if (name === "Expand") {
          onPressOption("expand-idea");
        } else if (name === "Summarize") {
          onPressOption("summarize-idea");
        }
      }}
      dropdownMenuMode
      style={{ position: "absolute", bottom: 24, right: 24 }}
    >
      <Pressable
        className={`${disabled ? "opacity-50" : ""}`}
        disabled={disabled}
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
