import {
  View,
  StatusBar,
  Image,
  Pressable,
} from "react-native";
import {ScrollView} from 'react-native-virtualized-view'
import React from "react";
import { useSelector } from "react-redux";
import StoryList from "../../../components/home/StoryList";
import Posts from "../../../components/home/Posts";
import { AntDesign,Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const index = () => {
  const { auth, homePosts } = useSelector((state) => state);

  return (
    <ScrollView
      style={{
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#fff",
      }}
    >
      <View className="justify-between items-center flex-row pl-1 pr-3">
        <Image
          style={{
            width: 160,
            height: 80,
            objectFit: "contain",
          }}
          source={require("../../../assets/logo-2.png")}
        />
        <View className="flex-row items-center ">
        <Pressable className="w-8 mr-4" onPress={() => router.push("/home/notify")}>
          <AntDesign name="hearto" size={24} color="black" />
        </Pressable>
        <Pressable className="w-8" >
          <Feather name="message-square" size={25} color="black" />
        </Pressable>
        </View>
      </View>
      <StoryList />

      <Posts />
    </ScrollView>
  );
};

export default index;
