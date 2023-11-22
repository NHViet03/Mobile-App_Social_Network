import { Tabs } from "expo-router";
import {
  Feather,
  Foundation,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import React from "react";
import Avatar from "../../components/Avatar";

export default function Layout() {
  const auth = useSelector((state) => state.auth);
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "#fff", height: 60 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Foundation name="home" size={25} color="#c43302" />
            ) : (
              <Feather name="home" size={25} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="search" size={25} color="#c43302" />
            ) : (
              <Ionicons name="search-outline" size={25} color="black" />
            ),
        }}
      />

      <Tabs.Screen
        name="add"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="plussquare" size={25} color="#c43302" />
            ) : (
              <Feather name="plus-square" size={25} color="black" />
            ),
        }}
      />

      <Tabs.Screen
        name="message"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="message"
                size={25}
                color="#c43302"
              />
            ) : (
              <Feather name="message-square" size={25} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            auth.avatar ? (
              focused ? (
                <Avatar avatar={auth.avatar} size="small" primary />
              ) : (
                <Avatar avatar={auth.avatar} size="small" />
              )
            ) : (
              <FontAwesome name="user-o" size={25} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="userProfile"
        options={{
          href:null
        }}
      />
      
    </Tabs>
  );
}
