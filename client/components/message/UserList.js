import React, {useState} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Avatar from '../Avatar'
import { router } from 'expo-router'

const UserList = () => {
    const [selectedId, setSelectedId] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setSelectedId(!selectedId)}
         style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderBottomColor: "#EEEEEE",
            borderBottomWidth: 1,
            backgroundColor: selectedId ? "#fff6e4" : "white",
           
          }}
        >
        <Avatar size="medium" avatar= 'https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png'></Avatar>
        <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          marginLeft: 10,
        }}
        >
        <Text style={{
          fontWeight: 600,
          fontSize: 16,
        }}
        >Nguyễn Hoàng Phúc</Text>
         <Text>Tin nhắn cuối cùng ở đây</Text>
         </View>
       
        </TouchableOpacity>
  )
}

export default UserList