import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  TextInput
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RegisterThird = ({ userData, setUserData, setRegisterStep }) => {
  const [code, setCode] = useState("");
  const handleSubmit = () => {
    setRegisterStep((preStep) => preStep + 1);
  };

  return (
    <View className="w-full items-center mb-10">
      <View>
        <Image
          source={require("../../assets/gmail.png")}
          style={{
            width: 200,
            height: 200,
            objectFit: "contain",
          }}
        />
      </View>
      <View className="w-3/4">
        <Text className="text-center font-medium text-base">
          Nhập mã xác nhận
        </Text>
        <Text className="text-center text-textColor text-sm">
          Nhập mã xác nhận mà chúng tôi đã gửi đến địa chỉ{" "}
          <Text className="text-primary">Gửi lại mã.</Text>
        </Text>
      </View>

      <View className="mt-5 mb-5">
        <View className="flex flex-row items-center border border-borderColor rounded-md w-3/4 py-2 px-2">
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={20}
            color="black"
          />
          <View className="flex-1 ml-1 border-l border-borderColor ">
            <TextInput
              className="ml-1"
              placeholder="Mã xác nhận"
              value={code}
              onChangeText={(text)=>setCode(text)}
            />
          </View>
        </View>
        
      </View>

      <TouchableOpacity
        className="rounded-md w-3/4 bg-primary py-3 px-2 mb-3 mt-6"
        onPress={handleSubmit}
      >
        <Text className="text-white text-center">Tiếp</Text>
      </TouchableOpacity>
      <Pressable
        className="mt-2"
        onPress={() => setRegisterStep((pre) => pre - 1)}
      >
        <Text className="text-primary text-center font-bold text-base">
          Quay lại
        </Text>
      </Pressable>
    </View>
  );
};

export default RegisterThird;

const styles = StyleSheet.create({});
