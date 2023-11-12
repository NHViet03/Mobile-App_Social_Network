import {
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Avatar from "../../../components/Avatar";
import Feather from "@expo/vector-icons/Feather";
import OtherMessage from "../../../components/message/OtherMessage";
import YouMessage from "../../../components/message/YouMessage";
import EmojiSelector from "react-native-emoji-selector";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

const chat = () => {
  // Alert
  const ReportMessageAlert = () =>
    Alert.alert("Tùy chọn đoạn chat", "Bạn cần trợ giúp gì?", [
      {
        text: "Xóa tin nhắn",
        onPress: () => console.log("Ask me later pressed"),
      },
      {
        text: "Báo cáo",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Hủy", onPress: () => console.log("OK Pressed") },
    ]);
  // Emoji
  const [showEmojiSelector, setShowemojiSelector] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleEmojiPress = () => {
    setShowemojiSelector(!showEmojiSelector);
  };
  const handleSendMessage = () => {
    if (message.trim() !== "" || selectedImage) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length,
          text: message,
          image: selectedImage,
          type: "You",
        },
      ]);

      setMessage("");
      setSelectedImage(null);
    }
  };
  // Images camera
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
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
      );
    }
    return null;
  };

  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 10,
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          height: 60,
          marginTop: StatusBar.currentHeight,
          backgroundColor: "#fff",
          marginBottom: 10,
        }}
      >
        <Pressable onPress={() => router.push("/message")}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </Pressable>
        <View>
          <TouchableOpacity
            onPress={() => router.push("/message/chat")}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderBottomColor: "#EEEEEE",
              borderBottomWidth: 1,
            }}
          >
            <View style={{}}>
              <Avatar
                size="middle"
                avatar="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
              ></Avatar>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                Nguyễn Hoàng Phúc
              </Text>
              <Text>Hoạt động 15 phút trước</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            marginLeft: 65,
          }}
          onPress={ReportMessageAlert}
        >
          <Feather name="info" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {/* Message chat */}
      <ScrollView>
        <OtherMessage />
        {messages.map((msg) =>
          msg.type === "You" ? (
            <YouMessage key={msg.id} text={msg.text} image={msg.image} />
          ) : (
            <OtherMessage key={msg.id} text={msg.text} image={msg.image} />
          )
        )}
      </ScrollView>
      {/* Input Nhắn tin */}
      <View
        style={{
          display: "flex",
          paddingTop: 10,
          borderTopColor: "#EEEEEE",
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            paddingHorizontal: 10,
            marginHorizontal: 10,
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            height: 40,
            marginBottom: 10,
            backgroundColor: "#EEEEEE",
            borderRadius: 30,
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
              borderRadius: 10,
              borderColor: "#fff",
              marginStart: 10,
            }}
          >
            {renderSelectedImage()}
            <TextInput
              placeholder="Nhắn tin"
              value={message}
              onChangeText={(text) => setMessage(text)}
            ></TextInput>
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
            onPress={handleSendMessage}
          >
            Gửi
          </Text>
        </View>
      </View>
      {showEmojiSelector && (
        <EmojiSelector
          onEmojiSelected={(emoji) => {
            setMessage((prevMessage) => prevMessage + emoji);
          }}
          style={{ height: 250 }}
        />
      )}
    </View>
  );
};

export default chat;

const styles = StyleSheet.create({});
