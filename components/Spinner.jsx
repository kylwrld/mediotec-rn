import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Spinner = ({ size=70, color="#2563eb", className="flex-1 justify-center items-center bg-white" }) => {
  return (
    <View className={className}>
        <ActivityIndicator size={size} color={color} />
    </View>
  )
}

export default Spinner
