import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="explore" options={{ headerTitle:'Khám phá', animation:"slide_from_right" }} />
    </Stack>
  );
}
