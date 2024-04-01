import { View, Text } from 'react-native'
import React from 'react'
import { defaultStyle } from '@/components/styles'

const Skills = () => {
  return (
    <View style={[defaultStyle.container,{paddingHorizontal:20,gap:18}]}>
      <Text>Skills</Text>
    </View>
  )
}

export default Skills