import { View } from "react-native";
import React from "react";
import GoogleSignIn from "@/components/GoogleSignIn";

const Auth = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <GoogleSignIn />
    </View>
  );
};

export default Auth;
