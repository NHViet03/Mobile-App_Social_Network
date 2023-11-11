import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import Avatar from "../components/Avatar";

const story = () => {
  const { id } = useLocalSearchParams();
  const { users } = useSelector((state) => state.homePosts);
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(new Animated.Value(0));

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    setUser(users.find((user) => user._id === id));

    Animated.timing(progress, {
      toValue: 5,
      duration: 5000,
      useNativeDriver: false,
    }).start();
    const closeModal = setTimeout(() => {
      router.back();
    }, 5000);
    return () => clearTimeout(closeModal);
  }, [id, users]);

  const progressAnimation = progress.interpolate({
    inputRange: [0, 5],
    outputRange: ["0%", "100%"],
  });

  return (
    <View className="relative bg-dark flex-1 px-1 items-center">
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View className="absolute top-10 h-[3px] bg-textColor w-[98%] ">
        <Animated.View
          style={{
            height: "100%",
            backgroundColor: "#fff",
            width: progressAnimation,
          }}
        />
      </View>
      {user && (
        <View className="mt-14">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center ">
              <Avatar avatar={user.avatar} size="middle" />
              <Text className=" ml-2 text-white font-semibold">
                {user.username}
              </Text>
            </View>
            <Pressable onPress={()=>router.back()}>
              <AntDesign name="close" size={24} color="white" />
            </Pressable>
          </View>
          <View className="justify-center items-center mt-10">
            <Image
              source={{
                uri: user.avatar,
              }}
              style={{
                width: windowWidth * 0.9,
                height: windowHeight * 0.6,
                resizeMode: "cover",
                borderRadius: 12,
              }}
            />
          </View>
        </View>
      )}
      <View className="absolute left-0 bottom-0 mx-2 mb-2 flex-row justify-between items-center">
        <TextInput
          placeholder="Gửi tin nhắn"
          className="flex-1 text-white px-3 mr-3 py-[10px] border-borderColor border-[0.5px] rounded-full"
          placeholderTextColor="white"
        />
        <Pressable className="mx-2">
          <AntDesign name="hearto" size={24} color="white" />
        </Pressable>
        <Pressable className="mx-2">
          <FontAwesome5 name="paper-plane" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default story;

const styles = StyleSheet.create({});
