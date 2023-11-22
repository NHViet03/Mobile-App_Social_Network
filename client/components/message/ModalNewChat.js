import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

import { TouchableOpacity } from "react-native-gesture-handler";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import UserList from "./UserList";

const ModalNewChat = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      className="flex-1"
    >
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#e6e6e6",
          paddingBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Tin nhắn mới
        </Text>
      </View>
      <Text
        style={{
          fontSize: 17,
          fontWeight: 600,
          marginTop: 10,
          marginBottom: 10,
          marginStart: 10,
        }}
      >
        Đến
      </Text>
      <TextInput
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginStart: 10,
          marginEnd: 10,
          borderRadius: 50,
          backgroundColor: "#EEEEEE",
        }}
        placeholder="Tìm kiếm"
      />
      <Text
        style={{
          fontSize: 17,
          fontWeight: 600,
          marginTop: 10,
          marginBottom: 10,
          marginStart: 10,
        }}
      >
        Gợi ý
      </Text>

      <BottomSheetScrollView showsVerticalScrollIndicator={false}>
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
        <UserList />
      </BottomSheetScrollView>

      <TouchableOpacity
        style={{
          backgroundColor: "#C43302",
          borderRadius: 10,
          marginStart: 30,
          marginEnd: 30,
          marginBottom: 10,
          marginVertical: 5,
          marginHorizontal: 40,
        }}
        onPress={() => router.push("/message/chat")}
      >
        <Text
          style={{
            fontSize: 17,
            fontWeight: 800,
            marginTop: 10,
            marginBottom: 10,
            marginStart: 10,
            textAlign: "center",
            color: "#fff",
          }}
        >
          Tạo tin nhắn mới
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalNewChat;

const styles = StyleSheet.create({});
