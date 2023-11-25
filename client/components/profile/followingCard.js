import React, {useState} from 'react'
import { View, Text } from 'react-native'
import Avatar from '../Avatar'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { router } from 'expo-router'

const FollowingCard = () => {
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
    onPress={() => router.push("/otherProfile")}
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
        backgroundColor: isFollowing ? "#DDDD" : "#c43302",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 10,
      }}
      onPress={handleToggleFollow}
      >
        <Text
        style={{
          fontSize: 14,
          color: isFollowing? "#000" : "#fff",
          fontWeight: "bold",
        }}
        >{isFollowing? 'Đang theo dõi' : 'Theo dõi'}</Text>

      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default FollowingCard;
