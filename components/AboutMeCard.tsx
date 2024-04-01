import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Props {
  Data: any,
  loading: boolean
}

const AboutMeCard = ({ Data, loading }: Props) => {
  const router = useRouter()
  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 30, gap: 20, }}>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontFamily: 'PopB', fontSize: 20 }}>About me</Text>
        <TouchableOpacity onPress={() => router.navigate('(modals)/AboutMe')}>
          <FontAwesome name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {
        loading ? <ActivityIndicator color={'#002695'}/>:
        (
          <View style={{ borderBottomWidth: 1, paddingBottom: 20, borderColor: '#e5e5e5' }}>
        <Text style={{ fontFamily: 'PopSb', color: 'grey' }}>{Data?.aboutme}</Text>
        <View style={{ flexDirection: 'row', gap: 10, paddingTop: 10 }}>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <FontAwesome name="briefcase" size={16} color="black" />
            <Text style={{ fontFamily: 'Pop', color: 'grey' }}>{Data?.experience},</Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 2 }}>
            <Entypo name="location-pin" size={16} color="black" />
            <Text style={{ fontFamily: 'Pop', color: 'grey' }}>{Data?.location}</Text>
          </View>

        </View>

      </View>
        )
      }

    </View>
  )
}

export default AboutMeCard