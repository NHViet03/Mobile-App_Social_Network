import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const ModalAlert = ({ alert }) => {
  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.5)",
        width: "100%",
        height: "100%",
        zIndex: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View className="bg-white w-3/4 h-1/3 rounded-lg ">
        <Text className="px-6 text-center font-bold text-2xl mt-5 text-primary-dark">
          {alert.title}
        </Text>
        <View className="px-5  flex-1 items-center justify-center ">
          <Text className="text-center text-textColor text-base leading-[18px]">
            {alert.content}
          </Text>
        </View>
        <Pressable
          className="border-t-borderColor border-t-[0.5px] py-3"
          onPress={() => alert.handlePress()}
        >
          <Text className="text-primary text-center text-base font-semibold">
            {alert.type === "error" ? "Thử lại" : "Hoàn tất"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ModalAlert;

const styles = StyleSheet.create({});
