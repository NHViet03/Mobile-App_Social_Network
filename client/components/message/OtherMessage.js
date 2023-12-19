import React from "react";
import { Text, View, Dimensions, Image } from "react-native";
import Avatar from "../Avatar";
import moment from "moment";

const OtherMessage = ({ message }) => {
  const chatWidth = Dimensions.get("window").width * 0.65;

  return (
    <View className="flex-row items-end">
      <Avatar size="small" avatar={message.sender.avatar} />
      <View className="mx-2">
        {message.media.length > 0 && (
          <View className="mb-2">
            {message.media.map((image, index) => (
              <Image
                key={index}
                style={{
                  width: chatWidth,
                  height: (chatWidth * 4) / 3,
                  borderRadius: 12,
                  objectFit: "contain",
                  marginBottom: 4,
                  borderWidth: 1,
                  padding: 4,
                  borderColor: "rgba(0,0,0,0.1)",
                }}
                source={{ uri: image.url }}
              />
            ))}
          </View>
        )}
        <View
          className="bg-inputColor p-3 rounded-r-2xl rounded-bl-2xl  rounded-tl-sm"
          style={{
            maxWidth: chatWidth,
          }}
        >
          <Text>{message.text}</Text>
        </View>
      </View>
      <Text className="text-textColor text-[12px]">
        {moment(message.createdAt).format("LT")}
      </Text>
    </View>
  );
};

export default OtherMessage;
