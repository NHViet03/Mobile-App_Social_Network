import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Avatar from "../Avatar";

const CardMessage = ({ user,isChecked }) => {
  return (
    <View className="flex-row items-center justify-between py-1">
      <View className="flex-1 flex-row items-center  ">
        <Avatar avatar={user.avatar} size="medium" />
        <View className="flex-1 ml-3">
          <Text className="font-semibold text-[15px] ">{user.fullname}</Text>
          <Text className="text-textColor">{user.username}</Text>
        </View>
      </View>
      <BouncyCheckbox
        size={25}
        fillColor="#c43302"
        innerIconStyle={{ borderWidth: isChecked? 0: 2, borderColor: "#000000cc" }}
        disableBuiltInState={true}
        isChecked={isChecked}
        bounceVelocityOut={0.1}
       
      />
    </View>
  );
};

export default CardMessage;

const styles = StyleSheet.create({});
