import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false,animation:'fade_from_bottom' }} />
      <Stack.Screen name="register" options={{ headerShown: false,animation:"slide_from_right" }} />
    </Stack>
  );
}
