import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { useAuthStore } from "@/store/auth.store";
import SignOutButton from "@/components/SignOutButton";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user } = useAuthStore();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ScrollView className="flex-1 bg-white">
        <View className="items-center p-6 bg-gray-50">
          {user?.user_metadata.picture ? (
            <Image
              source={{ uri: user.user_metadata.picture }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                marginBottom: 16,
              }}
            />
          ) : (
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#E5E7EB",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                {user?.user_metadata.name?.[0]?.toUpperCase() || "U"}
              </Text>
            </View>
          )}

          <Text className="text-2xl font-bold mb-2">
            {user?.user_metadata.name || "User"}
          </Text>
          <Text className="text-gray-600 text-lg">{user?.email}</Text>
        </View>

        <View className="p-6">
          <Text className="text-lg font-semibold mb-4">Account Settings</Text>

          <View className="bg-white rounded-lg shadow-sm border border-gray-100">
            <SignOutButton />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
