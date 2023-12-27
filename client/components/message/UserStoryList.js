import { FlatList, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
import Avatar from "../Avatar";
import ActiveStatus from "../ActiveStatus";

const UserStoryList = ({ users, online }) => {
  return (
    <FlatList
      data={users}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <Pressable
          className="mr-[12px] relative"
          onPress={() =>
            router.push({
              pathname: "/message/chatBox",
              params: {
                userId: item._id,
                avatar: item.avatar,
                username: item.username,
                fullname: item.fullname,
              },
            })
          }
        >
          <Avatar key={index} avatar={item.avatar} size="large" />
          {online.includes(item._id) && <ActiveStatus />}
        </Pressable>
      )}
    />
  );
};

export default UserStoryList;
