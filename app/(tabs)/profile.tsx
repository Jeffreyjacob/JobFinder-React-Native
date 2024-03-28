import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'

const Profile = () => {
  const { signOut, isSignedIn } = useAuth()
  return (
    <View>
    <Text>index</Text>
    <TouchableOpacity onPress={()=>signOut()}>
      <Text>Sign out</Text>
    </TouchableOpacity>
  </View>
  )
}

export default Profile