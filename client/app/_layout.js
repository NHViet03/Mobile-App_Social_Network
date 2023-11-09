import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import DataProvider from "../redux/store";
export default function Layout() {
  return (
    <DataProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
       
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="index" />
          </Stack>
        
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
    </DataProvider>
  );
}
