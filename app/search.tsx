import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const Search = () => {
  const router = useRouter()
  return (
    <View>
      <TouchableOpacity onPress={()=>router.back()}>
      <Text>back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Search