import { View,ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View className="flex-1 justify-center items-center mt-4" style={{
      backgroundColor: "#fff",
    }}>
        <ActivityIndicator size={48} color="#c43302"/>
    </View>
  )
}

export default Loading