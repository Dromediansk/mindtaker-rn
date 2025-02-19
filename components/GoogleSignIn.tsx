import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import React from "react";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import { useAuthStore } from "@/store/auth.store";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
});

const GoogleSignIn = () => {
  const { authLoading, setAuthLoading, setUser } = useAuthStore();

  const handleSignIn = async () => {
    try {
      setAuthLoading(true);
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
            avatarUrl: user.user_metadata.picture,
          });
          router.replace("/");
        }
      } else {
        throw new Error("no ID token present!");
      }
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={handleSignIn}
      disabled={authLoading}
    />
  );
};

export default GoogleSignIn;
