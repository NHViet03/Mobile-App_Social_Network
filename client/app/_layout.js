import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import React, { useRef, useMemo, useCallback, createContext } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import DataProvider from "../redux/store";
import ModalComment from "../components/ModalComment";
import ModalReportPost from "../components/ModalReportPost";
import ModalSharePost from "../components/ModalSharePost";

export const PostContext = createContext(null);

export default function Layout() {
  const bottomSheetModalComment = useRef(null);
  const bottomSheetModalReportPost = useRef(null);
  const bottomSheetModalSharePost = useRef(null);

  const snapPointsComment = useMemo(() => ["25%", "50%", "95%"], []);
  const snapPointsReportPost = useMemo(() => ["50%"], []);
  const snapPointsSharePost = useMemo(() => ["75%", "95%"], []);

  const handleOpenCommentModal = useCallback(() => {
    bottomSheetModalComment.current?.present();
  }, []);

  const handleOpenReportPostModal = useCallback(() => {
    bottomSheetModalReportPost.current?.present();
  });

  const handleOpenSharePostModal = useCallback(() => {
    bottomSheetModalSharePost.current?.present();
  });

  return (
    <DataProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PostContext.Provider
          value={{
            handleOpenCommentModal,
            handleOpenReportPostModal,
            handleOpenSharePostModal,
          }}
        >
          <BottomSheetModalProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />

              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="story"
                options={{ headerShown: false, animation: "fade" }}
              />
              
              <Stack.Screen name="index" />
            </Stack>

            <BottomSheetModal
              ref={bottomSheetModalComment}
              index={2}
              snapPoints={snapPointsComment}
              backgroundStyle={styles.modal}
              onChange={(index) => {
                if (index === 0) {
                  bottomSheetModalComment.current?.dismiss();
                }
              }}
            >
              <ModalComment />
            </BottomSheetModal>

            <BottomSheetModal
              ref={bottomSheetModalReportPost}
              index={0}
              snapPoints={snapPointsReportPost}
              backgroundStyle={styles.modal}
            >
              <ModalReportPost />
            </BottomSheetModal>

            <BottomSheetModal
              ref={bottomSheetModalSharePost}
              index={0}
              snapPoints={snapPointsSharePost}
              backgroundStyle={styles.modal}
            >
              <ModalSharePost />
            </BottomSheetModal>
          </BottomSheetModalProvider>
        </PostContext.Provider>
      </GestureHandlerRootView>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  modal: {
    borderRadius: 12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 20,
  },
});
