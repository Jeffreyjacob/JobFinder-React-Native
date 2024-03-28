import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react';
import HomeHeader from '@/components/HomeHeader';
import { defaultStyle } from '@/components/styles';
import HomeCard from '@/components/HomeCard';
import JobRecommandationCard from '@/components/JobRecommandationCard';
import JobCard from '@/components/JobCard';


const index = () => {
  const [category,setCategory] = useState('All Job')
  const onDataChanged = (category:string)=>{
     setCategory(category)
  }
  const jobList =[
    {}
  ]
  return (
    <SafeAreaView style={defaultStyle.container}>
      <View style={{paddingHorizontal:20,paddingTop:10}}>
      <HomeHeader/>
      <HomeCard/>
      <JobRecommandationCard onCategoryChanged={onDataChanged}/>
      <JobCard JobList={jobList}/>
      </View>
    </SafeAreaView>
  )
}


export default index