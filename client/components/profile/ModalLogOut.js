import React from 'react'
import { View ,Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import Avatar from '../Avatar';
import { AntDesign } from '@expo/vector-icons';
const ModalLogOut = ({handleCloseLogOutModal}) => {
  const handlePresslogout = () => {
    router.push("/login");
    handleCloseLogOutModal();
  }
  return (
    <View>
       <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#e6e6e6",
          paddingBottom: 20,
          paddingTop: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        >
       <View
       style={{
          marginStart: 10,
       }}
       > 
       <Avatar size="medium" avatar= 'https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png' ></Avatar>
       </View>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "#EDAA25",
              marginEnd: 20,
            }}
          >_hoang.phuc.seiza_</Text>
        <AntDesign 
        style={{
          marginEnd: 20,
        }}
        name="checkcircle" size={24} color="#EDAA25" />
        </View>
        <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 20,
          paddingTop: 20,
        }}
        onPress={handlePresslogout}
        >
        <MaterialIcons 
        style={{
          marginStart: 20,
          flex: 1,
        }}
        name="logout" size={30} color="#FF0000" />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "#FF0000",
              flex: 11,
              marginEnd: 20,
            }}
          >Đăng xuất</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ModalLogOut