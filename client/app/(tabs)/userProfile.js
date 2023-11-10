import { StyleSheet, Text, View,StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import {Stack, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";

const userProfile = (props) => {
  const { id } = useLocalSearchParams();
  const { homePosts } = useSelector((state) => state);
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(homePosts.users.find((user) => user._id === id));
  }, [id, homePosts]);

  return (
    <View style={{
      flex:1,
      backgroundColor:'#fff'
    }}>
      <Stack.Screen 
        options={{
          title:user.username,
        }}
      />
    </View>
  );
};

export default userProfile;

const styles = StyleSheet.create({});
