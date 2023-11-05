import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";


const login = () => {
  return (
    <View className="flex-1 items-center justify-center bg-red-200" >
      <Text className="text-red-500">login</Text>

      <Pressable onPress={() => router.replace("/register")}>
        <Text>Go to register</Text>
      </Pressable>
      <Pressable onPress={() => router.replace("/(tabs)/home")}>
        <Text>Go to home</Text>
      </Pressable>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({});
