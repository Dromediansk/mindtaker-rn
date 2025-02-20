import { Text, View } from "react-native";
import React from "react";
import GoogleSignIn from "@/components/GoogleSignIn";
import MindtakerImage from "@/components/MindtakerImage";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/utils/theme";
import { cssInterop } from "nativewind";

cssInterop(LinearGradient, {
  className: {
    target: "style",
  },
});

const Auth = () => {
  return (
    <View className="flex-1 items-center justify-around bg-white pt-16">
      <MindtakerImage
        size={250}
        source={require("@/assets/images/thoughts.png")}
      />
      <LinearGradient
        colors={[
          COLORS.white,
          COLORS.main_lighter,
          COLORS.main_light,
          COLORS.main,
        ]}
        start={{ x: 0.3, y: 0.3 }}
        end={{ x: 0.6, y: 0.85 }}
        className="flex-1 w-full justify-around items-center"
      >
        <View className="flex justify-center items-center">
          <Text className="text-4xl uppercase font-workSans-semibold pb-4">
            Mindtaker
          </Text>
          <Text className="text-2xl font-workSans-light">
            Your thoughts in an organized way
          </Text>
        </View>

        <GoogleSignIn />
      </LinearGradient>
    </View>
  );
};

export default Auth;
