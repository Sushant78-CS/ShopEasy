import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import useAuth from "../hooks/useAuth";
import useAuthStore from "../store/authStore";

export default function RootLayout() {
  useAuth();
  const { user, loading } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments?.[0] === "(auth)";
    const inTabsGroup = segments?.[0] === "(tabs)";
    const inCheckOut = segments?.[0] === "check";
    const inProfile = segments?.[0] === "profile";
    const inAdmin = segments?.[0] === "admin";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (user) {
      if (!inTabsGroup && !inCheckOut && !inProfile && !inAdmin) {
        router.replace("/(tabs)");
      }
    }

    console.log("USER:", user);
    console.log("SEGMENTS:", segments);
  }, [user, segments, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={"#fff"} />
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    </>
  );
}
