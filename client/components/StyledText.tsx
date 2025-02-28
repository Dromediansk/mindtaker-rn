import { FC } from "react";
import { Text, TextProps } from "react-native";

export const StyledText: FC<TextProps> = ({ className, ...props }) => {
  const hasFontFamily = className?.includes("font-");
  const baseClassName = hasFontFamily
    ? className
    : `font-workSans ${className || ""}`;

  return <Text className={baseClassName} {...props} />;
};
