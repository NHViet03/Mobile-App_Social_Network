import { View, StatusBar, Image, Pressable, StyleSheet } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useRef, useMemo, useCallback, createContext } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { GLOBAL_TYPES } from "../../../redux/actions/globalTypes";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Posts from "../../../components/home/Posts";
import StoryList from "../../../components/home/StoryList";
import ModalComment from "../../../components/ModalComment";
import ModalReportPost from "../../../components/ModalReportPost";

export const PostContext = createContext(null);

const index = () => {
  const bottomSheetModalComment = useRef(null);
  const bottomSheetModalReportPost = useRef(null);
  const dispatch = useDispatch();

  const snapPointsComment = useMemo(() => ["25%", "50%", "95%"], []);
  const snapPointsReportPost = useMemo(() => ["50%"], []);

  const handleOpenCommentModal = useCallback(() => {
    bottomSheetModalComment.current?.present();
  }, []);

  const handleOpenReportPostModal = useCallback(() => {
    bottomSheetModalReportPost.current?.present();
  });

  const handleCloseCommentModal = () => {
    dispatch({
      type: GLOBAL_TYPES.COMMENT_MODAL,
      payload: false,
    });
    bottomSheetModalComment.current?.dismiss();
  };
  const handleCloseReportPostModal = () => {
    dispatch({
      type: GLOBAL_TYPES.REPORT_POST_MODAL,
      payload: false,
    });
  };

  return (
    <ScrollView
      style={{
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#fff",
      }}
    >
      <View className="justify-between items-center flex-row pl-1 pr-3">
        <Image
          style={{
            width: 160,
            height: 80,
            objectFit: "contain",
          }}
          source={require("../../../assets/logo-2.png")}
        />
        <View className="flex-row items-center ">
          <Pressable
            className="w-8 mr-4"
            onPress={() => router.push("/home/notify")}
          >
            <AntDesign name="hearto" size={24} color="black" />
          </Pressable>
          <Pressable className="w-8">
            <Feather name="message-square" size={25} color="black" />
          </Pressable>
        </View>
      </View>
      <StoryList />
      <PostContext.Provider
        value={{
          handleOpenCommentModal,
          handleOpenReportPostModal,
        }}
      >
        <Posts />
      </PostContext.Provider>

      <BottomSheetModal
        ref={bottomSheetModalComment}
        index={2}
        snapPoints={snapPointsComment}
        backgroundStyle={styles.modal}
        onDismiss={() => handleCloseCommentModal()}
        onChange={(index) => {
          if (index === 0) {
            handleCloseCommentModal();
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
        onDismiss={() => handleCloseReportPostModal()}
      >
        <ModalReportPost />
      </BottomSheetModal>
    </ScrollView>
  );
};

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

export default index;
