import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

interface Props{
    Data:any[],
    loading:boolean
}


const SkillCard = ({Data,loading}:Props) => {
    const router = useRouter();
  return (
    <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 30}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontFamily: 'PopB', fontSize: 20 }}>Skills</Text>
        <TouchableOpacity onPress={() =>router.navigate('(modals)/Skills')}>
        <Ionicons name="add-circle-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{borderBottomWidth: 1, paddingBottom: 20, borderColor: '#e5e5e5' }}>

      </View>

    </View>
  )
}

export default SkillCard