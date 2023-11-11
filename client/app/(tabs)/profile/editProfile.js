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
import * as ImagePicker from 'expo-image-picker';
const editProfile = () => {
   // Images camera
   const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    } else {
        console.log("Cancelled");
    }
  };
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
          <Text style={{ fontSize: 19, fontWeight: "bold" }}
          >
            Chỉnh sửa trang cá nhân
          </Text>
        </View>
      </View>
      {/* Chỉnh sửa ảnh  */}
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "collumn",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          justifyContent: "center",
        }}
        onPress={pickImageAsync}
      >
        <Avatar
          size="large"
          avatar="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
        />
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "#0095f6",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Chỉnh sửa ảnh đại diện
        </Text>
      </TouchableOpacity>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderBottomColor: "#DDDDDD",
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            marginLeft: 10,
          }}
        >
          Tên
        </Text>
        <TextInput
          style={{
            padding: 7,
            fontStyle: "italic",
            marginLeft: 85,
            fontWeight: "bold",
            flex: 1,
            alignItems: "center",
          }}
        >
          Nguyễn Hoàng Phúc
        </TextInput>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderBottomColor: "#DDDDDD",
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            marginLeft: 10,
            maxWidth: 100,
          }}
        >
          Tên người dùng
        </Text>
        <TextInput
          style={{
            padding: 7,
            fontStyle: "italic",
            marginLeft: 40,
            fontWeight: "bold",
            flex: 1,
            alignItems: "center",
          }}
        >
          _hoang.phuc.seiza_
        </TextInput>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderBottomColor: "#DDDDDD",
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            marginLeft: 10,
          }}
        >
          Giới tính
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 7,
            marginLeft: 60,
            gap: 10,
          }}
        >
          <Text>Nam</Text>
          <CheckBox
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 7,
            marginLeft: 20,
            gap: 10,
          }}
        >
          <Text>Nữ</Text>
          <CheckBox
          />
        </View>
      </View>
    </View>
  );
};

export default editProfile;
