import { View, Text, TouchableOpacity,TextInput} from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { defaultStyle } from '@/components/styles';
import axios from 'axios';
import JobCard from '@/components/JobCard';


const Search = () => {
  const [Results,setResult] = useState([])
  const [loading,setLoading] = useState(false)


  const SearchResult = async (search:string)=>{ 
      setLoading(true)
      const apiKey = 'ab2c0f58-640c-4e32-90be-1b85db792b6b'
    const username = apiKey
    const password = ''

    // Create a base64 encoded string from the credentials
    const base64Credentials = btoa(`${username}:${password}`);
    const header = {
      'Authorization': `Basic ${base64Credentials}`,
    }
    const Job = await axios.get(`https://www.reed.co.uk/api/1.0/search?keywords=${search}`, { headers:header})
      .then(res => {
        setResult(res.data.results)
        console.log(res.data.results)
        setLoading(false)
      })
  }
  return (
    <Animated.View style={[defaultStyle.container,{paddingHorizontal:15,paddingTop:10}]}>
      <View style={[defaultStyle.searchbtn]}>
      <Ionicons name="search" size={24} color="black" />
      <TextInput placeholder='Search here' style={{width:220,fontSize:18,fontFamily:'PopSb'}} 
      placeholderTextColor={'grey'} onChangeText={SearchResult}/>
      <Ionicons name="filter" size={24} color="blue" />
      </View>

      <View style={{flexDirection:'row',justifyContent:'space-between',padding:10,paddingTop:28}}>
        <Text style={{fontFamily:'PopB',fontSize:20}}>Results</Text>
        <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
          <Text style={{fontFamily:'PopSb',fontSize:18,color:'#002695'}}>
            {Results.length}
          </Text>
        <Text style={{fontFamily:'Pop',color:'grey'}}>founds</Text>
        </View>
      </View>

      <JobCard loading={loading} JobList={Results} height={580}/>
      
    </Animated.View>
  )
}

export default Search