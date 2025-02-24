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
import SignOutButton from "@/components/SignOutButton";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <SignOutButton />
    </View>
  );
};

const DrawerLayout = () => {
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
          name="(calendar)"
          options={({ navigation }) => ({
            drawerLabel: "Calendar",
            headerTitle: "",
            headerLeft: () => (
              <Pressable onPress={() => navigation.openDrawer()}>
                {user.user_metadata.picture ? (
                  <Image
                    source={{ uri: user.user_metadata.picture }}
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
                      {user.user_metadata.name[0]?.toUpperCase() || "U"}
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

export default DrawerLayout;
