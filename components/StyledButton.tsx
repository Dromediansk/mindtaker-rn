import React, { cloneElement, forwardRef, ReactElement } from "react";
import { Pressable, ActivityIndicator, View } from "react-native";
import { StyledText } from "./StyledText";

type StyledButtonProps = {
  text: string;
  onPress?: () => void;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  icon?: ReactElement;
};

export const StyledButton = forwardRef<View, StyledButtonProps>(
  (
    {
      text,
      onPress,
      isLoading = false,
      className = "",
      disabled = false,
      icon,
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <Pressable
        className={`${isDisabled ? "bg-gray-300" : "bg-main"} h-14 rounded-full items-center justify-center ${className}`}
        onPress={onPress}
        disabled={isDisabled}
        ref={ref}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <View className="flex-row items-center justify-center gap-2">
            {icon ? cloneElement(icon) : null}
            <StyledText className="text-white text-xl uppercase font-medium">
              {text}
            </StyledText>
          </View>
        )}
      </Pressable>
    );
  }
);

StyledButton.displayName = "StyledButton";
