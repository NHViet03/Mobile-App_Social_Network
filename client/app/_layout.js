import { Stack } from "expo-router";
import DataProvider from "../redux/store";
export default function Layout() {
  return (
    <DataProvider>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="(auth)"  />
        <Stack.Screen name="(tabs)"  />
        <Stack.Screen name="index" />
      </Stack>
    </DataProvider>
  );
}
