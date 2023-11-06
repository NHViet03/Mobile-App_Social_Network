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
import DataProvider from "../../redux/store";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

export default function Layout() {
  const { auth } = useSelector((state) => state);
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
                <Image
                  source={{ uri: auth.avatar }}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    objectFit:'contain',
                    borderWidth: 2,
                    padding: 1,
                    borderColor: "#000",
                  }}
                />
              ) : (
                <Image
                  source={{ uri: auth.avatar }}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius:13 ,
                    objectFit:'contain',
                    borderWidth: 1,
                    padding: 1,
                    borderColor: "#d9d9d9",
                  }}
                />
              )
            ) : (
              <FontAwesome name="user-o" size={25} color="black" />
            ),
        }}
      />
    </Tabs>
  );
}
