import { View, Text, ScrollView, ActivityIndicator, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics';
import axios from 'axios';
import { db } from '@/firebase';

interface Props {
  JobList: any[],
  loading: boolean,
  height: number
}

const JobCard = ({ JobList, loading,height}: Props) => {
  const [jobDetail,setJobDetails] = useState<any>({});
  const apiKey = 'ab2c0f58-640c-4e32-90be-1b85db792b6b'
  const username = apiKey
  const password = ''

  // Create a base64 encoded string from the credentials
  const base64Credentials = btoa(`${username}:${password}`);
  const header = {
    'Authorization': `Basic ${base64Credentials}`,
  }
    const SaveJob = async (jobId:string)=>{
      try{
        const getJobDetail = await axios.get(`https://www.reed.co.uk/api/1.0/jobs/${jobId}`, { headers:header})
        .then(res =>{
          console.log(res.data)
          setJobDetails(res.data)
           db.collection('savedjob').add(res.data)
           Alert.alert('Job Saved')
        })
       
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }catch(err){
        Alert.alert('Something went wrong')
        console.log(err);
      }
     
    }
  return (
    <ScrollView
    showsVerticalScrollIndicator ={false}
      style={{ marginTop: 15 }}
      contentContainerStyle={{
        height: 'auto',
        paddingBottom: 40,
      
      }}>
      {
        loading ? <View style={{ alignItems: "center", paddingTop: 100 }}>
          <ActivityIndicator color={'#002695'} />
        </View> :
          <View>
            <FlatList
              data={JobList}
              renderItem={({ item }) => (
               
                  <TouchableOpacity>
                    <View style={styles.card}>
                      <View style={styles.icon}>
                        <FontAwesome name="briefcase" size={30} color="blue" />
                      </View>

                      <View>
                      <Link href={`/JobListing/${item.jobId}`} asChild>
                      <Text style={styles.cardName}>{item?.jobTitle}</Text>
                      </Link>
                        <Text style={{fontFamily:'Pop',fontSize:14,maxWidth:150}}>{item?.employerName}</Text>
                        <Text style={{fontFamily:'Pop',fontSize:12,color:'grey'}}>{item?.locationName}</Text>
                      </View>
                      <TouchableOpacity onPress={()=>SaveJob(item.jobId)}>
                        <FontAwesome name="bookmark-o" size={30} color="black" />
                      </TouchableOpacity>
                    </View>

                  </TouchableOpacity>
                
              )}
            />
          </View>
      }
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: "#eeeeee",
    marginVertical:8,
    borderRadius: 10,
    gap: 10,
    justifyContent: 'space-around',
  },
  cardName: {
    fontFamily: "PopSb",
    fontSize: 16,
    width: 200
  },
  icon:{
     paddingHorizontal:15,
     paddingVertical:18,
     backgroundColor:'white',
     borderRadius:10,
     height:60
  }
})
export default JobCard