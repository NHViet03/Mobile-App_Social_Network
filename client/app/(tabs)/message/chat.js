import {
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  Pressable,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-virtualized-view";
import { router } from "expo-router";
import { Ionicons, Entypo, Feather } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import OtherMessage from "../../../components/message/OtherMessage";
import YouMessage from "../../../components/message/YouMessage";
import Avatar from "../../../components/Avatar";

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
        <View
          style={{
            position: "absolute",
            right: 12,
            top:-10
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
          <Ionicons name="chevron-back-outline" size={28} color="black" />
        </Pressable>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => router.push("/message/chat")}
            style={{
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
            marginRight: 12,
          }}
          onPress={ReportMessageAlert}
        >
          <Feather name="info" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {/* Message chat */}
      <ScrollView style={{ marginTop: 12 }}>
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
