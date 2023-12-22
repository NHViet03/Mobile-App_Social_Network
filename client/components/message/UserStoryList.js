import { FlatList, Pressable } from "react-native";
import React, { useMemo } from "react";
import { router } from "expo-router";
import Avatar from "../Avatar";
import ActiveStatus from "../ActiveStatus";

const UserStoryList = ({ users, online }) => {
  const sequencePriority = useMemo(() => {
    let newSequence = [];
    users.forEach((user) => {
      if (online.includes(user._id)) {
        newSequence = [
          {
            ...user,
            active: true,
          },
          ...newSequence,
        ];
      } else {
        newSequence.push(user);
      }
    });
    return newSequence;
  }, [users, online]);

  return (
    <FlatList
      data={sequencePriority}
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
          {item.active && <ActiveStatus />}
        </Pressable>
      )}
    />
  );
};

export default UserStoryList;
