import React from "react";
import { View, Text, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import Avatar from "../../../components/Avatar";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import CheckBox from "react-native-check-box";
import * as ImagePicker from "expo-image-picker";
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
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
      >
        Mật khẩu của bạn phải có ít nhất 6 ký tự, bao gồm cả chữ và số, chữ cái
        và kí tự đặc biệt(!%@%)
      </Text>
      <TextInput
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          marginStart: 10,
          marginEnd: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#DDDDDD",
          marginBottom: 10,
        }}
        placeholder="Mật khẩu hiện tại"
      />
      <TextInput
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          marginStart: 10,
          marginEnd: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#DDDDDD",
          marginBottom: 10,
        }}
        placeholder="Mật khẩu mới"
      />
      <TextInput
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          marginStart: 10,
          marginEnd: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#DDDDDD",
          marginBottom: 10,
        }}
        placeholder="Nhập lại mật khẩu"
      />
      <TouchableOpacity>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 400,
            marginBottom: 280,
            fontWeight: "bold",
            color: "#EDAA25",
            paddingHorizontal: 10,
            marginStart: 10,
          }}
        >
          Bạn quên mật khẩu ư?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={()=> router.push("/profile")}
      style={{
        backgroundColor: "#c43302",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignItems: "center",
        marginStart: 10,
        marginEnd: 10,
        borderRadius: 20,
      }}
      >
        <Text
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: "#fff",
        }}
        >Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

export default changePasswork;
