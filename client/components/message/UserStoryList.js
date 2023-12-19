import { FlatList, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
import Avatar from "../Avatar";

const UserStoryList = ({ users }) => {
  return (
    <FlatList
      data={users}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <Pressable
          className="mr-[12px]"
          onPress={() => router.push("/message/chat")}
        >
          <Avatar key={index} avatar={item.avatar} size="large" />
        </Pressable>
      )}
    />
  );
};

export default UserStoryList;
