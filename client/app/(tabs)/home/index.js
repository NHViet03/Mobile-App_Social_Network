import { View, StatusBar, Image, Pressable, StyleSheet } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import Posts from "../../../components/home/Posts";
import StoryList from "../../../components/home/StoryList";

const index = () => {
  useEffect(() => {
    const firstLogin = async () => {
      const firstLogin = await AsyncStorage.getItem("firstLogin");
      if (firstLogin === null) {
        router.replace("/(auth)/login");
      }
    };

    firstLogin();
  }, []);

  return (
    <ScrollView
      style={{
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#fff",
      }}
      showsVerticalScrollIndicator={false}
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
          <Pressable
            className="w-8 mr-4"
            onPress={() => router.push("/home/notify")}
          >
            <AntDesign name="hearto" size={24} color="black" />
          </Pressable>
          <Pressable className="w-8" onPress={() => router.push("/message")}>
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
