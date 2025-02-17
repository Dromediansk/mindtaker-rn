import React from "react";
import { Redirect } from "expo-router";
import { setUser, useUserStore } from "@/store/user.store";
import { ActivityIndicator, Pressable, View, Text } from "react-native";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
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
  const { loading, user } = useUserStore();

  if (loading) {
    return <ActivityIndicator className="text-primary-300" size="large" />;
  }

  if (!user) {
    return <Redirect href="/sign-in" />;
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
                <MaterialIcons name="menu" size={28} />
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
