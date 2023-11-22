import React from 'react'
import { Text, View } from 'react-native'
import Avatar from '../Avatar'

const OtherMessage = () => {
  return (
    <View
    style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        minHeight: 50,
        maxWidth: 300,
        borderRadius: 20,
        marginBottom: 10,
    }}
    >
    <Avatar size="small"  avatar="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"/>
    <Text
    style={{
        color: "#01090e",
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "#e6e6e6",
        borderRadius: 10,
        marginStart: 10,
     
    }}
    >Xin chào , rất hân hạnh được làm quen với bạn ^^ Bạn có người yêu chưa</Text>
    </View>
   
  )
}

export default OtherMessage