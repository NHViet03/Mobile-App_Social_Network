import { StyleSheet, View, FlatList,Pressable } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {router} from 'expo-router'
import Avatar from "../Avatar";

const StoryList = () => {
  const  homePosts  = useSelector((state) =>state.homePosts);
  const { users } = homePosts;

  return (
    <FlatList
      data={users}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      className="pb-2 border-borderColor border-b-[0.5px] mx-[6px]"
      renderItem={({ item, index }) => (
        <Pressable className="mx-[6px]" onPress={() =>
          router.push({
            pathname: "/story",
            params: { id: item._id },
          })
        }>
          <Avatar key={index} avatar={item.avatar} size="large" border />
        </Pressable>
      )}
    />
  );
};

export default StoryList;

const styles = StyleSheet.create({});
