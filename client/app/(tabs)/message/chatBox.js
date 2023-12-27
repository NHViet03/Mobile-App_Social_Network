import {
  Text,
  TextInput,
  View,
  StatusBar,
  Pressable,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Octicons, Entypo, Feather, AntDesign } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import * as ImagePicker from "expo-image-picker";
import OtherMessage from "../../../components/message/OtherMessage";
import YouMessage from "../../../components/message/YouMessage";
import Avatar from "../../../components/Avatar";
import Loading from "../../../components/Loading";

import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../../utils/fetchData";
import {
  getMessages,
  MESS_TYPES,
  createMessage,
  deleteConversation,
} from "../../../redux/actions/messageAction";

const chatBox = () => {
  const auth = useSelector((state) => state.auth);
  const message = useSelector((state) => state.message);
  const socket = useSelector((state) => state.socket);
  const online = useSelector((state) => state.online);
  const dispatch = useDispatch();

  const { userId, username, fullname, avatar } = useLocalSearchParams();

  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageInput, setMessageInput] = useState({
    text: "",
    media: [],
  });
  const [page, setPage] = useState(0);
  const [showSetting, setShowSetting] = useState(false);

  const scrollRef = useRef();
  const pageEnd = useRef();

  useEffect(() => {
    const getUserData = async () => {
      setMessages([]);
      const res = await getDataAPI(`user/${userId}`, auth.token);
      setUser(res.data.user);
    };

    getUserData();
  }, [userId]);

  useEffect(() => {
    getMessagesData = async () => {
      if (messages.length > page * 10) return;
      setLoading(true);
      await dispatch(getMessages({ id: userId, auth, page }));
      setLoading(false);
    };

    getMessagesData();
  }, [dispatch, auth, userId, page]);

  useEffect(() => {
    setMessages([...message.messages].reverse());
    page === 0 && scrollRef.current.scrollToEnd({ animated: false });
  }, [message.messages]);

  const handleBack = () => {
    dispatch({ type: MESS_TYPES.GET_MESSAGES, payload: [] });
    router.replace("/message");
  };

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  const pickImageAsync = async () => {
    let media = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsMultipleSelection: true,
      base64: true,
    });

    if (!media.canceled) {
      const newArr = [];
      media.assets.forEach((image) => {
        newArr.push(image);
      });

      setMessageInput({
        ...messageInput,
        media: newArr,
      });
    } else {
      console.log("Cancelled");
    }
  };

  const handleRemoveImage = (index) => {
    const newArr = [...messageInput.media];
    newArr.splice(index, 1);
    setMessageInput({
      ...messageInput,
      media: newArr,
    });
  };

  const handleSendMessage = () => {
    const newMessage = {
      media: messageInput.media,
      sender: auth.user,
      recipient: user,
      text: messageInput.text,
      createdAt: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setMessageInput({
      text: "",
      media: [],
    });
    dispatch(createMessage({ message: newMessage, auth, socket }));
  };

  const handleDeleteConversation = async () => {
    await dispatch(deleteConversation({ id: userId, auth }));
    handleBack();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 12,
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          height: 60,
          marginTop: StatusBar.currentHeight,
          backgroundColor: "#fff",
          marginBottom: 16,
        }}
      >
        <Pressable onPress={handleBack}>
          <Feather name="arrow-left" size={24} color="black" />
        </Pressable>
        <View className="ml-3" style={{ flex: 1 }}>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/otherProfile",
                params: {
                  id: userId,
                },
              })
            }
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              <Avatar size="middle" avatar={avatar}></Avatar>
            </View>
            <View
              style={{
                flexDirection: "column",
                marginLeft: 12,
              }}
            >
              <Text className="text-base font-medium leading-5">
                {fullname}
              </Text>
              <Text className="text-textColor">
                {online.includes(userId) ? "Đang hoạt động" : username}
              </Text>
            </View>
          </Pressable>
        </View>
        <Pressable
          style={{
            position: "relative",
            width: 40,
            alignItems: "flex-end",
          }}
          onPress={() => setShowSetting(!showSetting)}
        >
          <Feather name="info" size={24} color="black" />
          {showSetting && (
            <View
              className="absolute top-7 bg-white right-0 w-[150px] px-2 py-[10px] rounded-md"
              style={{
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
                elevation: 6,
                zIndex: 9999,
              }}
            >
              <Pressable
                className="flex-row justify-between items-center"
                onPress={handleDeleteConversation}
              >
                <Text className="text-primary font-medium">Xóa hộp thoại</Text>
                <Octicons name="trash" size={24} color="#c43302" />
              </Pressable>
            </View>
          )}
        </Pressable>
      </View>

      <ScrollView
        ref={scrollRef}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        onScroll={(e) =>
          e.nativeEvent.contentOffset.y < 10 && setPage(page + 1)
        }
      >
        <View className="mt-2 mb-12 justify-center items-center">
          <Avatar size="large" avatar={avatar} />
          <Text className="font-bold text-[17px] mt-[6px]">{fullname}</Text>
          <Text className="text-base">Dreamers . {username}</Text>
          <Text className="text-base text-textColor mb-4">
            {user.followers?.length} người theo dõi . {user.following?.length}{" "}
            đang theo dõi{" "}
          </Text>
          <Pressable
            className="p-2 rounded-md bg-inputColor"
            onPress={() =>
              router.push({
                pathname: "/otherProfile",
                params: {
                  id: userId,
                },
              })
            }
          >
            <Text className="font-medium">Xem trang cá nhân</Text>
          </Pressable>
        </View>
        {loading && <Loading />}

        <View ref={pageEnd} />

        {messages.map((item, index) => (
          <View key={index} className="mb-3">
            {item.sender._id === auth.user._id ? (
              <YouMessage message={item} />
            ) : (
              <OtherMessage message={item} />
            )}
          </View>
        ))}
      </ScrollView>

      <View className="mt-3">
        {messageInput.media.length > 0 && (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="mb-3"
          >
            {messageInput.media.map((image, index) => (
              <Pressable
                style={{
                  position: "relative",
                  marginEnd: 12,
                }}
                key={index}
                onPress={() => handleRemoveImage(index)}
              >
                <Image
                  source={{ uri: image.uri }}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 4,
                    objectFit: "cover",
                  }}
                />
                <AntDesign
                  name="closecircleo"
                  size={16}
                  color="#fff"
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    shadowColor: "#000000",
                    shadowOffset: {
                      width: 0,
                      height: 6,
                    },
                  }}
                />
              </Pressable>
            ))}
          </ScrollView>
        )}
        <View
          className="bg-inputColor"
          style={{
            paddingHorizontal: 12,
            alignItems: "center",
            flexDirection: "row",
            height: 48,
            marginBottom: 12,
            borderRadius: 24,
          }}
        >
          <Entypo
            name="emoji-happy"
            size={24}
            color="black"
            onPress={handleEmojiPress}
          />

          <View
            style={{
              flex: 1,
              fontSize: 16,
              borderRadius: 8,
              marginStart: 12,
            }}
          >
            <TextInput
              placeholder="Nhắn tin"
              value={messageInput.text}
              onChangeText={(text) =>
                setMessageInput({ ...messageInput, text })
              }
            />
          </View>
          <Octicons
            name="image"
            size={24}
            color="black"
            style={{
              marginEnd: 12,
            }}
            onPress={pickImageAsync}
          />

          <Pressable onPress={handleSendMessage}>
            <Text
              style={{
                color: "#C43302",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Gửi
            </Text>
          </Pressable>
        </View>
      </View>

      {showEmojiSelector && (
        <EmojiSelector
          onEmojiSelected={(emoji) => {
            setMessageInput({
              ...messageInput,
              text: messageInput.text + emoji,
            });
          }}
          columns={8}
          showSearchBar={false}
          showTabs={false}
          style={{ height: 200 }}
        />
      )}
    </View>
  );
};

export default chatBox;
