
import { StyleSheet, Text ,View,StatusBar, Pressable, TouchableOpacity, Image, TextInput  } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


const NewPost = () => {
  return (
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
       <Pressable onPress={() => router.push("/add")}
       >
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </Pressable>
        <View>
          <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
          >Bài viết mới</Text>
        </View>
       <TouchableOpacity
        style={{
          marginEnd: 10,
        }}
        onPress={() => router.push("/home")}
       >
         <Text
         style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#edaa25",
         }}
         >Hủy</Text>
       </TouchableOpacity>
      </View>
      <View
      style={{
        height: 200,
        width: 200,
        marginBottom: 10,
      }}
      >
        <Text>Hình ở đây</Text>
      </View>
      <TextInput
      placeholder='Viết chú thích'
        style={{
            height: 50,
            width: 400,
            paddingHorizontal: 10,
            borderBottomColor: '#EEEEEE',
            borderBottomWidth: 1,
            marginBottom: 280,
        }}
      />
      <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
        marginStart: 10,
        marginEnd: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#c43302'
      }}
      onPress={() => router.push("/home")}
      >
        <Text
        style={{
          color: '#fff',
          fontSize: 18,
          fontWeight: 'bold',
          marginStart: 10,
        }}
        >Thêm vào bài viết</Text>
      </TouchableOpacity>
   </View>
  )
}

export default NewPost

const styles = StyleSheet.create({})

