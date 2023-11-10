import { StyleSheet, Text, TextInput ,View,StatusBar, Pressable, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import StoryList from '../../../components/home/StoryList';
import { EvilIcons } from '@expo/vector-icons';
import Avatar from '../../../components/Avatar';
import UserChat from '../../../components/message/UserChat';


const message = () => {
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
       <Pressable onPress={() => router.push("/home")}
       >
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </Pressable>
        <View>
          <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
          >_hoang.phuc.seiza_</Text>
        </View>
       <TouchableOpacity>
          <Entypo 
          name="new-message" 
          size={24} color="black" 
            
          />
       </TouchableOpacity>
       
      </View>
      {/* Input Search */}
      <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EEEEEE",
        marginEnd: 10,
        marginStart: 10,
        paddingBottom: 5,
        marginBottom: 10,
        borderRadius: 10,

        }}
      >
      <EvilIcons name="search" size={30} color="black" 
      style={{
        marginStart: 5,
      }}
      />
        <TextInput
        placeholder='Tìm kiếm'
        style={{
          padding: 5,
          flex: 1,
        }}
        />
      </View>
      {/* Post Story */}
     <View
     style={{
      marginBottom: 5,
     }}
     >
      <StoryList />
      </View>
        {/* User Chat */}
       <ScrollView >
          <UserChat/>
          <UserChat/>
          <UserChat/>
          <UserChat/>
          <UserChat/>
          <UserChat/>
          <UserChat/>
          <UserChat/>
          <UserChat/>
        </ScrollView>
   </View>
  )
}

export default message

const styles = StyleSheet.create({})