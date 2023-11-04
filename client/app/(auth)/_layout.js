import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen
        name="register2"
        options={{
          headerTitle: "Trang Đăng ký 2",
          headerStyle: {
            backgroundColor: "red",
          },
          headerTintColor: "white",
        }}
      />
    </Stack>
  );
}
