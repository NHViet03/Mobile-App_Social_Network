import React, {useState} from 'react'
import { View, Text } from 'react-native'
import Avatar from '../Avatar'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { router } from 'expo-router'

const FollowerCard = () => {
    const [isFollowing, setIsFollowing] = useState(true)

    const handleToggleFollow = () => {
        setIsFollowing(!isFollowing);
    }
  return (
    <TouchableOpacity
    style={{
      display: "flex",
      flexDirection: "row",
      paddingHorizontal: 10,
      paddingVertical: 5,
      alignItems: "center",
    }}
    onPress={() => router.push("/profile/otherProfile")}
    >
      <Avatar size="medium"   avatar="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" />
      <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
      }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>
          John Doe
        </Text>
        <Text style={{ fontSize: 14, color: "#9e9e9e", marginLeft: 10 }}>
          @johndoe
        </Text>
      </View>
      <TouchableOpacity
      style={{
        marginEnd: 10,
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#DDDD" ,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 10,
      }}
      >
        <Text
        style={{
          fontSize: 14,
          color: "#000",
          fontWeight: "bold",
        }}
        >Gỡ</Text>

      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default FollowerCard;
