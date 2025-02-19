import React from "react";
import { Redirect } from "expo-router";
import { useAuthStore } from "@/store/auth.store";
import { ActivityIndicator, Pressable, View, Text, Image } from "react-native";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { setUser } = useAuthStore();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <Pressable
        onPress={() => setUser(null)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 24,
          marginLeft: 8,
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          gap: 8,
        }}
      >
        <MaterialIcons name="logout" size={24} color="#FF4444" />
        <Text style={{ color: "#FF4444" }}>Sign Out</Text>
      </Pressable>
    </View>
  );
};

const AppLayout = () => {
  const { authLoading, user } = useAuthStore();

  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator className="text-primary-300" size="large" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/auth" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="index"
          options={({ navigation }) => ({
            drawerLabel: "Home",
            headerTitle: "",
            headerLeft: () => (
              <Pressable onPress={() => navigation.openDrawer()}>
                {user?.avatarUrl ? (
                  <Image
                    source={{ uri: user.avatarUrl }}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 18,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: "#E5E7EB",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </Text>
                  </View>
                )}
              </Pressable>
            ),
            headerLeftContainerStyle: {
              paddingLeft: 16,
              paddingRight: 16,
            },
          })}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default AppLayout;
