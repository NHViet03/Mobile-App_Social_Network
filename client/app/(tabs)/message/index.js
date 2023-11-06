import { StyleSheet, Text, SafeAreaView,View,StatusBar } from 'react-native'
import React from 'react'

const index = () => {
  return (
    <SafeAreaView style={{
      marginTop:StatusBar.currentHeight,
    }}>
      <Text>Message</Text>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})