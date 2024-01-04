import React from 'react'
import { AntDesign, Feather } from "@expo/vector-icons";
import { View, Text, Pressable, TouchableOpacity } from 'react-native'


function NotifyAlert() {
  return (
    <View>
        <AntDesign name="hearto" size={24} color="black" 
        />
        <Text
        style= {{
          position: "absolute",
          top: -1,
          right: 5,
          backgroundColor: "#c43302",
          color: "#fff",
          width: 12,
          height: 12,
          borderRadius: 9,
          textAlign: "center",
          fontSize: 12,
          lineHeight: 18,
          fontWeight: "bold",
        
        }}
        ></Text>
    </View>
  )
}

export default NotifyAlert