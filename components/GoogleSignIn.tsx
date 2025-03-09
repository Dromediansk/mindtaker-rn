import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import React from "react";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import { useAuthStore } from "@/store/auth.store";
import { upsertUserInDb } from "@/utils/queries/user.query";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
});

const GoogleSignIn = () => {
  const { authLoading, setAuthLoading, setUser, setSession } = useAuthStore();

  const handleSignIn = async () => {
    try {
      setAuthLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.data?.idToken) {
        const { data: userData, error: userError } =
          await supabase.auth.signInWithIdToken({
            provider: "google",
            token: userInfo.data.idToken,
          });

        if (userError) {
          throw new Error(userError.message);
        }
        const authUser = userData?.user;

        if (authUser) {
          await upsertUserInDb(authUser);

          const { data: sessionData, error: sessionError } =
            await supabase.auth.getSession();

          if (sessionError) {
            throw new Error(sessionError.message);
          }

          const session = sessionData?.session;
          setUser(authUser);
          setSession(session);
          router.replace("/");
        }
      } else {
        throw new Error("no user or session data found");
      }
    } catch (error: unknown) {
      console.error("Failed to sign in with Google:", error);
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
