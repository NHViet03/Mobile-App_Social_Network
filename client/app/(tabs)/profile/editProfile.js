import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StatusBar } from "react-native";
import {
  MaterialIcons,
  AntDesign,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import CheckBox from "react-native-check-box";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import Avatar from "../../../components/Avatar";

const editProfile = () => {
  const auth = useSelector((state) => state.auth);

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
  // Radio Checkbox
  const [isMaleChecked, setIsMaleChecked] = useState(true);
  const [isFemaleChecked, setIsFemaleChecked] = useState(false);
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
          <Text style={{ fontSize: 19, fontWeight: "bold" }}>
            Chỉnh sửa trang cá nhân
          </Text>
        </View>
        <TouchableOpacity>
          <Text
            onPress={() => router.push("/profile")}
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "#c43302",
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            Lưu
          </Text>
        </TouchableOpacity>
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
        <Avatar size="large" avatar={auth.avatar} />
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "#c43302",
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
            fontSize: 16,
            marginLeft: 85,
            fontWeight: "400",
            flex: 1,
            alignItems: "center",
          }}
        >
          {auth.fullname}
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
            fontSize: 16,
            marginLeft: 40,
            fontWeight: "400",
            flex: 1,
            alignItems: "center",
          }}
        >
          {auth.username}
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
          <Text
            style={{
              fontWeight: "400",
              fontSize: 16,
            }}
          >
            Nam
          </Text>
          <CheckBox
            checkBoxColor="#c43302"
            isChecked={isMaleChecked}
            onClick={() => {
              setIsMaleChecked(!isMaleChecked);
              if (isFemaleChecked) {
                setIsFemaleChecked(!isFemaleChecked);
              }
            }}
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
          <Text
            style={{
              fontWeight: "400",
              fontSize: 16,
            }}
          >
            Nữ
          </Text>
          <CheckBox
            checkBoxColor="#c43302"
            isChecked={isFemaleChecked}
            onClick={() => {
              setIsFemaleChecked(!isFemaleChecked);
              if (isMaleChecked) {
                setIsMaleChecked(false);
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default editProfile;
