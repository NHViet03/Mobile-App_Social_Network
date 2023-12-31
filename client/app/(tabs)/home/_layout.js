import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="notify"
        options={{headerShown: false , animation: "slide_from_right"}}
      />
      <Stack.Screen
        name="editPost"
        options={{ headerShown: false , animation: "slide_from_right" }}
      />
    </Stack>
  );
}
