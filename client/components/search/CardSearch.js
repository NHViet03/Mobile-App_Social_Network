import { Text, View, Pressable } from "react-native";
import React from "react";
import Avatar from "../Avatar";
import { AntDesign } from "@expo/vector-icons";

const CardSearch = ({ user }) => {
  return (
    <View className="flex-row justify-between items-center py-1">
      <View className="flex-1 flex-row items-center mr-3">
        <Avatar avatar={user.avatar} size="medium" />
        <View className="flex-1 ml-3">
          <Text className="font-semibold text-[15px]">{user.fullname}</Text>
          <Text className="text-textColor">{user.username}</Text>
        </View>
      </View>
      
      <Pressable className="ml-3 w-6 h-6 ">
        <AntDesign name="close" size={18} color="black" />
      </Pressable>
    </View>
  );
};

export default CardSearch;
