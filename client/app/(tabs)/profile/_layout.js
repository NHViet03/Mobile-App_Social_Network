import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="editProfile" options={{ headerShown: false }} />
      <Stack.Screen name="changePasswork" options={{ headerShown: false }} />
      <Stack.Screen name="following" options={{ headerShown: false }} />
      <Stack.Screen name="otherProfile" options={{ headerShown: false }} />
    </Stack>
  );
}