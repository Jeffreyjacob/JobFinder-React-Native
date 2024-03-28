import { View, Text } from 'react-native'
import React from 'react'

interface Props{
    JobList:any[],
}

const JobCard = ({JobList}:Props) => {
  return (
    <View>
      <Text>JobCard</Text>
    </View>
  )
}

export default JobCard