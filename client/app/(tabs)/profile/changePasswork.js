import React from "react";
import { View, Text, TextInput, StatusBar, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const changePasswork = () => {
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          paddingHorizontal: 10,
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          height: 60,
          marginTop: StatusBar.currentHeight,
          backgroundColor: "#fff",
          marginBottom: 10,
          borderBottomColor: "#DDDDDD",
          borderBottomWidth: 1,
        }}
      >
        <Pressable onPress={() => router.push("/profile")}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </Pressable>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 10,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 19, fontWeight: "bold" }}>Đổi mật khẩu</Text>
        </View>
      </View>
      <Text
        style={{
          fontSize: 15,
          fontWeight: 400,
          marginTop: 12,
          marginBottom: 24,
          paddingHorizontal: 12,
        }}
      >
        Mật khẩu của bạn phải có ít nhất 6 ký tự, bao gồm cả chữ và số, chữ cái
        và kí tự đặc biệt(!%@%)
      </Text>
      <TextInput
        style={{
          paddingHorizontal: 16,
          paddingVertical: 10,
          marginHorizontal: 12,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#DDDDDD",
          marginBottom: 16,
        }}
        placeholder="Mật khẩu hiện tại"
      />
      <TextInput
        style={{
          paddingHorizontal: 12,
          paddingVertical: 10,
          marginHorizontal: 12,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#DDDDDD",
          marginBottom: 16,
        }}
        placeholder="Mật khẩu mới"
      />
      <TextInput
        style={{
          paddingHorizontal: 16,
          paddingVertical: 10,
          marginHorizontal: 12,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#DDDDDD",
          marginBottom: 16,
        }}
        placeholder="Nhập lại mật khẩu"
      />
      <TouchableOpacity>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 400,
            marginBottom: 64,
            fontWeight: "500",
            color: "#c43302",
            paddingHorizontal: 10,
            marginStart: 12,
          }}
        >
          Bạn quên mật khẩu ư?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/profile")}
        style={{
          backgroundColor: "#c43302",
          borderRadius: 5,
          paddingVertical: 10,
          paddingHorizontal: 30,
          alignItems: "center",
          marginHorizontal: 12,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#fff",
          }}
        >
          Xác nhận
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default changePasswork;
