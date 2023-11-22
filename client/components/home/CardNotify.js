import { Text, View, Pressable } from "react-native";
import React from "react";
import moment from "moment";
import Avatar from "../Avatar";

const CardNotify = ({ notify }) => {
  return (

      <View className="flex-row justify-between items-center py-1">
        <View className="flex-1 flex-row items-start mr-3">
          <Avatar avatar={notify.user.avatar} size="middle" />
          <View className="flex-1 ml-3">
            <Text className="text-[15px] leading-[16px]">
              <Text className="font-semibold">{notify.user.username}</Text>
              {notify.content}
            </Text>
            <Text className="text-textColor mt-[2px] font-medium">
              {moment(notify.createdAt).fromNow()}
            </Text>
          </View>
        </View>
        <Pressable>
          <View className="bg-primary px-3 py-2 rounded-lg">
            <Text className="text-white font-semibold">Theo dõi</Text>
          </View>
        </Pressable>
      </View>
    
  );
};

export default CardNotify;
