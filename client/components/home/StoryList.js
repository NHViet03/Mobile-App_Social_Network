import { StyleSheet, View, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Avatar from "../Avatar";

const StoryList = () => {
  const  homePosts  = useSelector((state) =>state.homePosts);
  const { users } = homePosts;

  return (
    <FlatList
      data={users}
      horizontal={true}
      className="pb-2 border-borderColor border-b-[0.5px]"
      renderItem={({ item, index }) => (
        <View className="mx-[6px]">
          <Avatar key={index} avatar={item.avatar} size="large" border />
        </View>
      )}
    />
  );
};

export default StoryList;

const styles = StyleSheet.create({});
