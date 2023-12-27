import React from "react";
import { View, Text, Pressable } from "react-native";
import Avatar from "../Avatar";
import { router } from "expo-router";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";
import ActiveStatus from "../ActiveStatus";

const ConservationItem = ({ conversation, auth, online }) => {
  const user = conversation.recipients.find(
    (item) => item._id !== auth.user._id
  )||auth.user;

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/message/chatBox",
          params: {
            id: conversation._id,
            userId: user._id,
            avatar: user.avatar,
            username: user.username,
            fullname: user.fullname,
          },
        })
      }
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View className="relative">
        <Avatar size="medium" avatar={user.avatar}></Avatar>
        {online.includes(user._id) && <ActiveStatus small />}
      </View>
      <View className="ml-3">
        <Text className="font-medium text-base leading-5">{user.fullname}</Text>
        <View className="flex-row items-center">
          <Text
            className={`${
              new Date() - new Date(conversation.updatedAt) < 60000
                ? "font-medium"
                : "text-textColor"
            }`}
          >
            {conversation.media.length > 0
              ? "Đã gửi một hình ảnh"
              : conversation.text.length > 20
              ? conversation.text.slice(0, 20) + "..."
              : conversation.text}
          </Text>
          <Entypo name="dot-single" size={12} color="#737373" />
          <Text className="text-textColor">
            {moment(conversation.updatedAt).fromNow()}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ConservationItem;
