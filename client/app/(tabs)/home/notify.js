import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import React from "react";
import { router } from "expo-router";

const notify = () => {
  return (
    <View
      className="flex-1"
      style={{
        backgroundColor: "#fff",
      }}
    >
      <Text>notify</Text>
      <Pressable onPress={() => router.push("/home")}>
        <Text>Back</Text>
      </Pressable>
    </View>
  );
};

export default notify;

const styles = StyleSheet.create({});
