import React from "react";
import { Text, View, Dimensions, Image, Pressable } from "react-native";
import { router } from "expo-router";
import Avatar from "../Avatar";
import moment from "moment";

const YouMessage = ({ message }) => {
  const chatWidth = Dimensions.get("window").width * 0.6;

  return (
    <View className="flex-row-reverse items-end">
      <Avatar size="small" avatar={message.sender.avatar} />
      <View className="mx-2 items-end justify-end">
        {message.media.length > 0 && (
          <View className="mb-2">
            {message.media.map((image, index) => (
              <Image
                key={index}
                style={{
                  width: chatWidth,
                  height: (chatWidth * 4) / 3,
                  borderRadius: 12,
                  objectFit: "cover",
                  marginBottom: 4,
                  borderWidth: 1,
                  padding: 4,
                  borderColor: "rgba(0,0,0,0.1)",
                }}
                source={{ uri: image.uri ? image.uri : image.url }}
              />
            ))}
          </View>
        )}
        {message.url && (
          <Pressable
            className="bg-inputColor rounded-2xl"
            onPress={() => {
              router.replace({
                pathname: "/otherProfile/postDetail",
                params: {
                  id: message.url._id,
                },
              });
            }}
            style={{
              width:chatWidth+24
            }}
          >
            <View className="flex-row px-[10px] my-[10px] items-center">
              <Avatar avatar={message.url.user.avatar} />
              <Text className="ml-2 font-bold text-base">
                {message.url.user.username}
              </Text>
            </View>
            <Image
              source={{ uri: message.url.images[0].url }}
              style={{
                width: chatWidth + 24,
                height: (chatWidth * 4) / 3 + 32,
                objectFit: "cover",
              }}
            />
            <View className="px-[10px] my-4">
              <Text className="font-bold mr-1">
                {message.url.user.username}{" "}
                <Text
                  className="ml-1 font-normal"
                >
                  {message.url.content.length > 20
                    ? message.url.content.slice(0, 20) + "..."
                    : message.url.content}
                </Text>
              </Text>
            </View>
          </Pressable>
        )}
        <View className="flex-row-reverse items-end">
          {message.text && (
            <View
              className="bg-primary p-3 rounded-l-2xl rounded-br-2xl  rounded-tr-sm"
              style={{
                maxWidth: chatWidth,
              }}
            >
              <Text className="text-white">{message.text}</Text>
            </View>
          )}
          <Text className="mr-2 text-textColor text-[10px]">
            {moment(message.createdAt).format("hh:mm, D MMM")}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default YouMessage;
