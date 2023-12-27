import React from "react";
import { Text, View, Dimensions, Image, ImageBase } from "react-native";
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
