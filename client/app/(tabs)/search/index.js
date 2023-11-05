import { StyleSheet, Text, View,SafeAreaView,StatusBar } from 'react-native'
import React from 'react'

const index = () => {
  return (
    <SafeAreaView style={{
      marginTop:StatusBar.currentHeight,
    }}>
      <Text>Search</Text>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})