import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, animation:"slide_from_left" }}  />
      <Stack.Screen name="chatBox" options={{ headerShown: false ,animation:"slide_from_right"}} />
    </Stack>
  );
}