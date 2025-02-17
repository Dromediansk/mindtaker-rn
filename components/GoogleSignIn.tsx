import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import React from "react";
import { supabase } from "@/utils/supabase";
import { setUser } from "@/store/user.store";
import { router } from "expo-router";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
});

const GoogleSignIn = () => {
  const handleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.data?.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.data.idToken,
        });

        if (error) {
          console.error(error);
        }

        const user = data?.user;

        if (user) {
          setUser({
            id: user.id,
            email: user.email || "",
            name: user.user_metadata.name,
            fullName: user.user_metadata.full_name,
          });
          router.replace("/");
        }
      } else {
        throw new Error("no ID token present!");
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Light}
      onPress={handleSignIn}
    />
  );
};

export default GoogleSignIn;
