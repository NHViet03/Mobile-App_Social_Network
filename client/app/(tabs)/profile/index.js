import { StyleSheet, Text, View,SafeAreaView,StatusBar } from 'react-native'
import React from 'react'
import {useSelector} from 'react-redux'

const index = () => {
  const auth = useSelector(state => state.auth)
  return (
    <SafeAreaView style={{
      marginTop:StatusBar.currentHeight,
    }}>
      <Text>{auth.username}</Text>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})