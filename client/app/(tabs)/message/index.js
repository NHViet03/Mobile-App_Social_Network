import { StyleSheet, Text, TextInput ,View,StatusBar, Pressable, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import StoryList from '../../../components/home/StoryList';
import { EvilIcons } from '@expo/vector-icons';
import Avatar from '../../../components/Avatar';
import { GLOBAL_TYPES } from "../../../redux/actions/globalTypes";
import UserChat from '../../../components/message/UserChat';
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import ModalNewChat from '../../../components/message/ModalNewChat';


const index = () => {
  const bottomSheetModalNewChat = useRef(null);
  const dispatch = useDispatch();

  const snapPointsNewChat = useMemo(() => ["95%"], []);

  const handleOpenNewChatModal = useCallback(() => {
    bottomSheetModalNewChat.current?.present();
  }, []);

  const handleCloseNewChatModal = () => {
    dispatch({
      type: GLOBAL_TYPES.NEWCHAT_MODAL,
      payload: false,
    });
    bottomSheetModalNewChat.current?.dismiss();
  };

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
          onPress={handleOpenNewChatModal}
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
      <BottomSheetModal
        ref={bottomSheetModalNewChat}
        index={0}
        snapPoints={snapPointsNewChat}
        backgroundStyle={styles.modal}
        onDismiss={() => handleCloseNewChatModal()}
        onChange={(index) => {
          if (index === -1) {
            handleCloseNewChatModal();
          }
        }}
      >
        <ModalNewChat/>
      </BottomSheetModal>
   </View>
   
  )
}

export default index

const styles = StyleSheet.create({
  modal: {
    borderRadius:12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 20,
  },
})