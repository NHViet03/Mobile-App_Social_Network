import {
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { router } from "expo-router";
import { Feather, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import ConservationItem from "../../../components/message/ConversationItem";
import ModalNewChat from "../../../components/message/ModalNewChat";
import UserStoryList from "../../../components/message/UserStoryList";
import Loading from "../../../components/Loading";

import { GLOBAL_TYPES } from "../../../redux/actions/globalTypes";
import { useSelector, useDispatch } from "react-redux";
import { getConversations } from "../../../redux/actions/messageAction";

const index = () => {
  const auth = useSelector((state) => state.auth);
  const message = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const [conversations, setConversations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getConversationsData = async () => {
      if (message.firstLoad) return;
      setLoading(true);
      await dispatch(getConversations({ auth }));
      setLoading(false);
    };

    getConversationsData();
  }, [auth, dispatch, message.firstLoad]);

  useEffect(() => {
    setConversations(message.conversations);
  }, [message.conversations]);

  const bottomSheetModalNewChat = useRef(null);
  const snapPointsNewChat = useMemo(() => ["95%"], []);
  const handleOpenNewChatModal = useCallback(() => {
    bottomSheetModalNewChat.current?.present();
  }, []);
  const handleCloseNewChatModal = () => {
    dispatch({
      type: GLOBAL_TYPES.NEWCHAT_MODAL,
      payload: false,
    });
    bottomSheetModalNewChat.current?.dismiss();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          paddingHorizontal: 16,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          height: 60,
          marginTop: StatusBar.currentHeight,
          backgroundColor: "#fff",
          marginBottom: 16,
        }}
      >
        <View className="flex-row items-center gap-4">
          <Pressable onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="black" />
          </Pressable>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {auth.user.username}
          </Text>
        </View>
        <TouchableOpacity>
          <Entypo
            name="new-message"
            size={24}
            color="black"
            onPress={handleOpenNewChatModal}
          />
        </TouchableOpacity>
      </View>
      <View className="mx-4 mb-5 px-3 py-[6px] rounded-lg flex-row items-center justify-between bg-inputColor">
        <MaterialCommunityIcons name="magnify" size={24} color="black" />
        <TextInput
          placeholder="Tìm kiếm"
          className="flex-1 mx-2"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          margin: 16,
          paddingBottom: 16,
        }}
      >
        <UserStoryList users={auth.user.followers} />
        <Text className="font-bold text-base my-3">Tin nhắn</Text>

        {loading && <Loading />}
        {conversations.length === 0 && !loading && (
          <Text className="fw-medium text-base text-center">
            Không có tin nhắn nào
          </Text>
        )}

        {conversations.map((conversation) => (
          <View key={conversation._id} className=" mb-4">
            <ConservationItem conversation={conversation} auth={auth} />
          </View>
        ))}
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetModalNewChat}
        index={0}
        snapPoints={snapPointsNewChat}
        backgroundStyle={styles.modal}
        onDismiss={() => handleCloseNewChatModal()}
        onChange={(index) => {
          if (index === -1) {
            handleCloseNewChatModal();
          }
        }}
      >
        <ModalNewChat />
      </BottomSheetModal>
    </View>
  );
};

export default index;

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
