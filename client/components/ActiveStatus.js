import { View, Text } from "react-native";
import React from "react";

export default function ActiveStatus({ small }) {
  return (
    <View
      className="absolute w-4 h-4 rounded-lg bg-[#0bda51] border-[2px] border-white"
      style={{
        bottom: small ? 2 : 4,
        right: small ? 2 : 4,
      }}
    ></View>
  );
}
