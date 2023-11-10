import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
const RegisterFirst = ({ userData, setUserData, setRegisterStep }) => {
  const { email, username, fullname, password } = userData;
  const [error, setError] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const handleChangeEmail = (text) => {
    setUserData({ ...userData, email: text });
  };
  const handleChangeUsername = (text) => {
    setUserData({ ...userData, username: text });
  };
  const handleChangeFullname = (text) => {
    setUserData({ ...userData, fullname: text });
  };
  const handleChangePassword = (text) => {
    setUserData({ ...userData, password: text });
  };

  const handleSubmit = () => {
    let err = {};
    if (!email) err.email = "Email không được để trống.";
    if (email && !validateEmail()) err.email = "Email không hợp lệ.";

    if (!username) err.username = "Tên người dùng không được để trống.";

    if (!fullname) err.fullname = "Tên đầy đủ không được để trống.";

    if (password.length < 6) err.password = "Mật khẩu ít nhất 6 kí tự.";

    if (Object.keys(err).length > 0) return setError(err);

    setRegisterStep((preStep) => preStep + 1);
  };

  const validateEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  return (
    <View className="w-full items-center mb-10">
      <View>
        <Image
          style={{
            width: 250,
            height: 150,
            objectFit: "contain",
          }}
          source={require("../../assets/logo-2.png")}
        />
      </View>
      <View className="mb-3">
        <View className="flex flex-row items-center border border-borderColor rounded-md w-3/4 py-2 px-2">
          <MaterialCommunityIcons
            name="email-outline"
            size={20}
            color="black"
          />
          <View className="flex-1 ml-1 border-l border-borderColor ">
            <TextInput
              className="ml-1"
              placeholder="Địa chỉ email"
              value={email}
              onChangeText={handleChangeEmail}
            />
          </View>
        </View>
        {error.email && (
          <Text className="text-primary-light text-xs mt-1">
            *{error.email}
          </Text>
        )}
      </View>

      <View className="mb-3">
        <View className="flex flex-row items-center border border-borderColor  rounded-md w-3/4 py-2 px-2">
          <FontAwesome name="user-o" size={20} color="black" />
          <View className="flex-1 ml-1 border-l border-borderColor ">
            <TextInput
              className="ml-1"
              placeholder="Tên người dùng"
              value={username}
              onChangeText={handleChangeUsername}
            />
          </View>
        </View>
        {error.username && (
          <Text className="text-primary-light text-xs mt-1">
            *{error.username}
          </Text>
        )}
      </View>

      <View className="mb-3">
        <View className="flex flex-row items-center border border-borderColor  rounded-md w-3/4 py-2 px-2">
          <AntDesign name="profile" size={20} color="black" />
          <View className="flex-1 ml-1 border-l border-borderColor ">
            <TextInput
              className="ml-1"
              placeholder="Tên đầy đủ"
              value={fullname}
              onChangeText={handleChangeFullname}
            />
          </View>
        </View>
        {error.fullname && (
          <Text className="text-primary-light text-xs mt-1">
            *{error.fullname}
          </Text>
        )}
      </View>
      <View className="mb-3">
        <View className="flex flex-row items-center border border-borderColor  rounded-md w-3/4 py-2 px-2">
          <AntDesign name="lock" size={20} color="black" />
          <View className="flex-1 ml-1 border-l border-borderColor ">
            <TextInput
              className="ml-1"
              placeholder="Mật khẩu"
              value={password}
              onChangeText={handleChangePassword}
              secureTextEntry={showPassword ? false : true}
            />
          </View>
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={{
              minWidth: 30,
            }}
          >
            <Text className="text-primary text-right">
              {showPassword ? "Ẩn" : "Hiển thị"}
            </Text>
          </Pressable>
        </View>
        {error.password && (
          <Text className="text-primary-light text-xs mt-1">
            *{error.password}
          </Text>
        )}
      </View>

      <TouchableOpacity
        className="rounded-md w-3/4 bg-primary py-3 px-2 mb-3 mt-10"
        onPress={handleSubmit}
      >
        <Text className="text-white text-center">Tiếp</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterFirst;

const styles = StyleSheet.create({});
