import {View } from "react-native";
import React, { useState, useEffect } from "react";
import {Stack, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";

const userProfile = (props) => {
  const { id } = useLocalSearchParams();
  const { users } = useSelector((state) => state.homePosts);
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(users.find((user) => user._id === id));
  }, [id, users]);

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
