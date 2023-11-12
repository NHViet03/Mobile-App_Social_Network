import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Images camera
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    } else {
      console.log("Cancelled");
    }
  };

  const renderSelectedImage = () => {
    if (selectedImage) {
      return (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
      );
    }
    return null;
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
          justifyContent: "space-between",
          flexDirection: "row",
          height: 50,
          marginTop: StatusBar.currentHeight,
          backgroundColor: "#fff",
          marginBottom: 10,
        }}
      >
        <Pressable onPress={() => router.push("/home")}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </Pressable>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Tạo bài viết mới
          </Text>
        </View>
        <TouchableOpacity
          style={{
            marginEnd: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#c43302",
            }}
            onPress={() => router.push("/add/newPost")}
          >
            Tiếp
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selectedImage ? (
          <Image
            style={{
              width: "100%",
              minHeight:350,
              height:'100%',
              maxHeight:500,
              borderRadius:4,
              objectFit: "cover",
            }}
            source={{ uri: selectedImage }}
          />
        ) : (
          <View>
            <Image
              style={{
                width: 200,
                height: 200,
                objectFit: "cover",
              }}
              source={require("../../../assets/UploadPhoto.png")}
            />
          </View>
        )}
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 12,
            paddingHorizontal: 12,
            backgroundColor: "#c43302",
            borderRadius: 12,
            marginHorizontal: 40,
            marginTop: 20,
          }}
          onPress={pickImageAsync}
        >
          <Ionicons name="image" size={24} color="#fff" />
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Chọn từ thiết bị của bạn
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
