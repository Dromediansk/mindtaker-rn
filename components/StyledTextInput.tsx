import { TextInput, TextInputProps } from "react-native";
import React, { FC } from "react";

const StyledTextInput: FC<TextInputProps> = ({ className, ...props }) => {
  return (
    <TextInput
      className={`text-xl p-5 rounded-lg border-2 border-white focus:border-main-dark ${className}`}
      {...props}
    />
  );
};

export default StyledTextInput;
