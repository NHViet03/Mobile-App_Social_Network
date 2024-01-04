import { Text, View, Pressable, Image } from "react-native";
import React, { useMemo } from "react";
import { router } from "expo-router";
import moment from "moment";
import Avatar from "../Avatar";

const CardNotify = ({ notify }) => {
  const customUrl = useMemo(() => {
    if (notify.url.includes("/post")) {
      return {
        pathname: "/otherProfile/postDetail",
        id: notify.url.split("/")[2],
      };
    } else {
      return {
        pathname: "/otherProfile",
        id: notify.url.split("/")[2],
      };
    }
  }, [notify.url]);

  return (
    <Pressable
      className="flex-row justify-between items-center py-1 mb-4"
      onPress={() =>
        router.push({
          pathname:customUrl.pathname,
          params: {
            id: customUrl.id,
          },
        })
      }
    >
      <View className="flex-1 flex-row items-start mr-3">
        <Avatar avatar={notify.user.avatar} size="middle" />
        <View className="flex-1 ml-3">
          <Text className="text-[15px] leading-[16px]">
            <Text className="font-semibold">{notify.user.username+" "}</Text>
            {notify.content}
          </Text>
          <Text className="text-textColor mt-[2px] font-medium">
            {moment(notify.createdAt).fromNow()}
          </Text>
        </View>
      </View>
      {notify.image ? (
        <Image
          source={{
            uri: notify.image,
          }}
          style={{
            width: 56,
            height: 56,
            borderRadius: 4,
            objectFit: "cover",
          }}
        />
      ) : (
        <Pressable>
          <View className="bg-primary px-3 py-2 rounded-lg">
            <Text className="text-white font-semibold">Theo dõi</Text>
          </View>
        </Pressable>
      )}
    </Pressable>
  );
};

export default CardNotify;
