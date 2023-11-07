import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import Avatar from "../Avatar";
import { router } from "expo-router";

const CardHeader = ({ user }) => {
  return (
    <View className="py-2 px-3 flex-row justify-between items-center">
      <Pressable
        className="flex-row items-center"
        onPress={() =>
          router.push({
            pathname: "/(tabs)/userProfile",
            params: { id:user._id},
          })
        }
      >
        <Avatar avatar={user.avatar} size="middle"  />
        <Text className=" ml-[6px] font-bold ">{user.username}</Text>
      </Pressable>
      <Entypo name="dots-three-vertical" size={18} color="black" />
    </View>
  );
};

export default CardHeader;

const styles = StyleSheet.create({});
