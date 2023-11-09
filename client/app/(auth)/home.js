import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { router } from "expo-router";

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Pressable onPress={() => router.replace("/login")}>
        <Text style={styles.dont_have_account_register} >login</Text>
      </Pressable>
    </View>
    
  )
}

export default Home

const styles = StyleSheet.create({})