import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import { router } from "expo-router";

const register = () => {
  return (
    <View>
      <Text>register</Text>
      <Pressable onPress={() => router.replace("/login")}>
        <Text>Back to login</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/register2")}>
        <Text>Go to Register 2</Text>
      </Pressable>
    </View>
  )
}

export default register

const styles = StyleSheet.create({})