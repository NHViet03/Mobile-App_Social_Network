import { View, Text, Pressable } from "react-native";
import React from "react";
import Avatar from "../Avatar";
import FollowBtn from "../FollowBtn";

export default function FollowList({
  users,
  followers,
  auth,
  handleDeleteFollow,
}) {
  return (
    <View>
      {users.map((user) => (
        <View
          key={user._id}
          className="flex-row justify-between items-center mb-4 "
        >
          <View className="flex-row items-center ">
            <Avatar avatar={user.avatar} size="medium" />
            <View className="ml-3">
              <Text className="font-medium mb-1">{user.username}</Text>
              <Text className="text-textColor" t>
                {user.fullname}
              </Text>
            </View>
          </View>
          {followers && auth ? (
            <Pressable
              className="bg-inputColor rounded-[6px] px-4 py-2"
              onPress={() => handleDeleteFollow(user)}
            >
              <Text className="font-bold">Xoá</Text>
            </Pressable>
          ) : (
            <FollowBtn user={user} />
          )}
        </View>
      ))}
    </View>
  );
}
