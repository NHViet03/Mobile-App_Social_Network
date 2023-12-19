import {
  Text,
  TextInput,
  View,
  StatusBar,
  Pressable,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { FontAwesome, Entypo, Feather } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import * as ImagePicker from "expo-image-picker";
import OtherMessage from "../../../components/message/OtherMessage";
import YouMessage from "../../../components/message/YouMessage";
import Avatar from "../../../components/Avatar";
import Loading from "../../../components/Loading";

import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../../utils/fetchData";
import { getMessages } from "../../../redux/actions/messageAction";

const chatBox = () => {
  const auth = useSelector((state) => state.auth);
  const message = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const { id, userId, username, fullname, avatar } = useLocalSearchParams();

  const [messageType, setMessageType] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef();


  useEffect(() => {
    const getUserData = async () => {
      setMessages([]);
      const res = await getDataAPI(`user/${userId}`, auth.token);
      setUser(res.data.user);
    };

    getUserData();
  }, [userId]);

  useEffect(() => {
    if (!id) return;
    getMessagesData = async () => {
      setLoading(true);
      await dispatch(getMessages({ id, auth }));
      setLoading(false);
    };

    getMessagesData();
  }, [dispatch, auth, id]);

  useEffect(() => {
    setMessages([...message.messages].reverse());
  }, [message.messages]);

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  // const handleSendMessage = () => {
  //   if (message.trim() !== "" || selectedImage) {
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       {
  //         id: prevMessages.length,
  //         text: message,
  //         image: selectedImage,
  //         type: "You",
  //       },
  //     ]);

  //     setMessage("");
  //     setSelectedImage(null);
  //   }
  // };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
    } else {
      console.log("Cancelled");
    }
  };
  const renderSelectedImage = () => {
    if (selectedImage) {
      return (
        <View
          style={{
            position: "absolute",
            right: 12,
            top: -10,
          }}
        >
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 50, height: 50, borderRadius: 4 }}
          />
        </View>
      );
    }
    return null;
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
        <Pressable onPress={() => router.replace("/message")}>
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
              <Text className="text-textColor">{username}</Text>
            </View>
          </Pressable>
        </View>
        <TouchableOpacity>
          <Feather name="info" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        onContentSizeChange={() =>
          scrollRef.current?.scrollToEnd({ animated: false })
        }
        scrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-2 mb-12 justify-center items-center">
          <Avatar size="large" avatar={user.avatar} />
          <Text className="font-bold text-[17px] mt-[6px]">
            {user.fullname}
          </Text>
          <Text className="text-base">Dreamers . {user.username}</Text>
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

      <View
        style={{
          display: "flex",
          borderTopColor: "#EEEEEE",
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            paddingHorizontal: 10,
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            height: 50,
            marginBottom: 10,
            backgroundColor: "#EEEEEE",
            borderRadius: 30,
            position: "relative",
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
              borderColor: "#fff",
              marginStart: 10,
            }}
          >
            {renderSelectedImage()}
            <TextInput placeholder="Nhắn tin"></TextInput>
          </View>

          <Entypo
            name="image"
            size={24}
            color="black"
            style={{
              marginEnd: 10,
            }}
            onPress={pickImageAsync}
          />
          <FontAwesome
            name="microphone"
            size={24}
            color="black"
            style={{
              marginEnd: 10,
            }}
          />
          <Text
            style={{
              color: "#C43302",
              fontWeight: 600,
              fontSize: 16,
              marginEnd: 10,
            }}
          >
            Gửi
          </Text>
        </View>
      </View>
      {showEmojiSelector && (
        <EmojiSelector
          // onEmojiSelected={(emoji) => {
          //   setMessage((prevMessage) => prevMessage + emoji);
          // }}
          showSearchBar={false}
          style={{ height: 240 }}
        />
      )}
    </View>
  );
};

export default chatBox;
