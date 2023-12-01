import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

const SelectImage = ({ post, setPost, setAddPostStep }) => {
  const pickImageAsync = async () => {
    let images = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      quality: 1,
      base64:true
    });

    if (!images.canceled) {
      let newArr = [];
      images.assets.forEach((image) => newArr.push(image));

      setPost({
        ...post,
        images: newArr,
      });
      setAddPostStep(2);
    }
    else {
        return;
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Image
        source={require("../../assets/addPost.png")}
        styles={{
          width: 150,
          height: 150,
        }}
        resizeMode="cover"
      />
      <Text className="text-[20px] font-medium mb-3">Chọn ảnh để đăng</Text>
      <Pressable
        className="bg-primary px-3 py-2 rounded-lg"
        onPress={pickImageAsync}
      >
        <Text className="font-medium text-white text-base">
          Chọn từ thiết bị của bạn
        </Text>
      </Pressable>
    </View>
  );
};

export default SelectImage;
