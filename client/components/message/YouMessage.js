import React from 'react'
import { Text, View } from 'react-native'
import Avatar from '../Avatar'

const YouMessage = () => {
  return (
    <View
    style={{
        display: "flex", 
        alignSelf: "flex-end",
        minHeight: 50,
        maxWidth: 300,
        borderRadius: 20,
        marginBottom: 10,
    }}
    >
    <Text
    style={{
        color: "#fff",
        alignItems: "flex-end",
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "#dc8567",
        borderRadius: 10,
     
    }}
    >Chào bạn, mình có người yêu rồi. Chúc bạn may mắn lần sau</Text>
    </View>
  )
}

export default YouMessage