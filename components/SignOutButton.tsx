import { Text, Pressable } from "react-native";
import React from "react";
import { useAuthStore } from "@/store/auth.store";
import { MaterialIcons } from "@expo/vector-icons";
import { cssInterop } from "nativewind";

cssInterop(MaterialIcons, {
  className: {
    target: "style",
    nativeStyleToProp: { color: true, fontSize: "size" },
  },
});

const SignOutButton = () => {
  const { logout } = useAuthStore();

  return (
    <Pressable
      onPress={logout}
      className="flex-row items-center p-6 ml-2 border-t border-t-gray-200 gap-2"
    >
      <MaterialIcons name="logout" className="text-red-600 text-3xl" />
      <Text className="text-red-600">Sign Out</Text>
    </Pressable>
  );
};

export default SignOutButton;
