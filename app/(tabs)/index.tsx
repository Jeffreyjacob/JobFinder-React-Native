import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react';
import HomeHeader from '@/components/HomeHeader';
import { defaultStyle } from '@/components/styles';
import HomeCard from '@/components/HomeCard';
import JobRecommandationCard from '@/components/JobRecommandationCard';
import JobCard from '@/components/JobCard';
import axios from 'axios';



const index = () => {
  const [category, setCategory] = useState('Accounting');
  const [JobListing, setJoblisting] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = 'ab2c0f58-640c-4e32-90be-1b85db792b6b'
  const onDataChanged = (category: string) => {
    setCategory(category)
  }
  useEffect(() => {
    setLoading(true)
    const fetchJob = async () => {
      const username = apiKey
      const password = ''

      // Create a base64 encoded string from the credentials
      const base64Credentials = btoa(`${username}:${password}`);
      const header = {
        'Authorization': `Basic ${base64Credentials}`,
      }
      const Job = await axios.get(`https://www.reed.co.uk/api/1.0/search?keywords=${category}`, { headers:header})
        .then(res => {
          setJoblisting(res.data.results)
          setLoading(false)
        })
    }
    fetchJob();
  }, [category])
  return (
    <SafeAreaView style={defaultStyle.container}>
      <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
        <HomeHeader />
        <HomeCard />
        <JobRecommandationCard onCategoryChanged={onDataChanged} />
        <JobCard JobList={JobListing} loading={loading} height={275}/>
      </View>
    </SafeAreaView>
  )
}


export default index