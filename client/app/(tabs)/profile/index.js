import { StyleSheet, Text, View,SafeAreaView,StatusBar, Pressable } from 'react-native'
import React from 'react'
import {useSelector} from 'react-redux'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Octicons } from '@expo/vector-icons';
import Avatar from '../../../components/Avatar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const index = () => {
  return (
   <ScrollView
   style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
   >
      <View
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
      >
          <View
         style={{
          paddingHorizontal: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          height: 50,
          marginTop:StatusBar.currentHeight,
          backgroundColor: "#fff",
          marginBottom: 10,
        }}>
          <View>
            <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
            >_hoang.phuc.seiza_</Text>
          </View>
        <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
         gap: 10,
        }}
        >
         <TouchableOpacity>
          <Octicons name="diff-added" size={24} color="black" />
          </TouchableOpacity>
        
           <TouchableOpacity>
              <Ionicons name="ios-reorder-three-outline" size={35} color="black" />
           </TouchableOpacity>
        </View>
         
        </View>
       
        <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        >
         {/* Logo User, Name and info following, follower, post */}
          <View
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          >
           {/* Logo User, Name */}
          <View
          style={{
            marginLeft: 10,
           }}
          >
             <Avatar 
             
             size="large" avatar= 'https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png'></Avatar>
          </View>
           <Text
           style={{
             fontSize: 15,
             fontWeight: 500,
             marginLeft: 5,
             marginTop: 5,
           }}
           >Nguyễn Hoàng Phúc</Text>
          </View>
          <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
          
          }}
          >
           {/* post, following, follwer */}
            <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            >
              <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
              }}
              >12</Text>
              <Text>Bài viết</Text>
            </View>
            <View
              style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
              }}
              >765</Text>
              <Text
              style={{
                fontSize: 10,
              }}
              >Người theo dõi</Text>
            </View>
            <View
              style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            >
              <Text
                style={{
                fontSize: 17,
                fontWeight: "bold",
              }}
              >860</Text>
              <Text
                 style={{
                fontSize: 10,
              }}
              >Đang theo dõi</Text>
            </View>
          </View>
        </View>
        {/* Button */}
       <View
       style={{
        display: "flex",
        flexDirection: "row",
        alignContent : "center",
        alignItems: "center",
        justifyContent:"center",
        justifyContent: "space-between",
        marginBottom: 20,
       }}
       >
            <TouchableOpacity
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#DDDD",
              borderRadius: 5,
              paddingVertical: 5,
              paddingHorizontal: 30,
              width: 160,
              marginLeft: 10,
            }}
            >
              <Text
              style={{
                fontSize: 15,
                fontWeight: 600,
              }}
              >Chỉnh sửa</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
             style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#DDDD",
              borderRadius: 5,
              paddingVertical: 5,
              paddingHorizontal: 30,
              width: 160,
              marginRight: 10,
            }}
            >
              <Text
                style={{
                fontSize: 15,
                fontWeight: 600,
              }}
              >Đổi mật khẩu</Text>
            </TouchableOpacity>
       </View>
       <View
       style={{
        display: "flex",
        flexDirection: "row",
        alignContent : "center",
        alignItems: "center",
        justifyContent:"space-between",
        marginBottom: 10,
       
       }}
       >
       <View
        style={{ 
          flex: 1, 
          alignItems: "flex-start",
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderColor: "#000000",
          }}
       > 
          <MaterialCommunityIcons 
          style={{ alignSelf: "center" }}
          name="grid" size={24} color="black" />
       </View>
       <View
        style={{ 
          flex: 1, 
          alignItems: "flex-end",
          borderBottomWidth: 1,
          borderColor: "#DDDD",
          paddingBottom: 10,
           }}
       > 
          <Feather
            style={{ alignSelf: "center" }}
           name="bookmark" size={24} color="#DDDDDD" />
        </View>
       </View>
       <View>
        {/* Info Bài Viết */}

       </View>
      </View>
   </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})