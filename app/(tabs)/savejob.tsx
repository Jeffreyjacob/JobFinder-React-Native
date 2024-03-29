import { View, Text } from 'react-native'
import React from 'react';
import Animated from 'react-native-reanimated';
import { defaultStyle } from '@/components/styles';

const Savejob = () => {
  return (
    <Animated.ScrollView style={defaultStyle.container}>
      <Text>savejob</Text>
    </Animated.ScrollView>
  )
}

export default Savejob