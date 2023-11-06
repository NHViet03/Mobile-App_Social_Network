import { StyleSheet, Text, View,StatusBar,SafeAreaView } from 'react-native'
import React from 'react'

const index = () => {
  return (
    <SafeAreaView style={{
      marginTop:StatusBar.currentHeight,
    }}>
      <Text>Add</Text>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})