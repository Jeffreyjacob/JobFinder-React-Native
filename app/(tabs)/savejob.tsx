import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated';
import { defaultStyle } from '@/components/styles';
import { db } from '@/firebase';
import { Link } from 'expo-router';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { SelectSavedJob } from '@/Store/Feature/SavedjobSlice';

const Savejob = () => {
  const [savedJob,setSavedJob] = useState<any>([]);
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch();
  const selectJob = useSelector(SelectSavedJob);
  useEffect(()=>{
    const GetsavedJob = async ()=>{
      setLoading(true)
      const jobs = await db.collection("savedjob").onSnapshot(
        doc =>{
          const items = doc.docs.map(
            
            docs =>({
              id:docs.id,
              data:docs.data()
            })
          )
          setSavedJob(items)
          setLoading(false)
        }
      )
     
  }
  GetsavedJob();
  },[])




  const DeleteButton = (jobId:any)=>{
    return(
      <Animated.View style={{marginHorizontal:20,paddingTop:18}} 
      entering={SlideInRight.delay(100)}>
        <TouchableOpacity style={styles.deleteBtn} onPress={()=>deleteJob(jobId)}>
         <AntDesign name="delete" size={20} color="white" />
      </TouchableOpacity>
      </Animated.View>
    )
  }
  const deleteJob = async (jobId:any)=>{
       console.log(jobId)
       try{
       await db.collection('savedjob').doc(jobId).delete();
       setSavedJob((prevSavedJob:any) => prevSavedJob.filter((item:any) => item.id !== jobId));
       }catch(err){
        console.log(err)
       }
  }
  return (
    <Animated.ScrollView style={[defaultStyle.container,{paddingTop:20,paddingHorizontal:20}]}>
       {
        loading ? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator color={'#002695'} />
          </View>:
             (
              <FlatList
              data={savedJob}
              renderItem={(item)=>(
                <Swipeable renderRightActions={()=>DeleteButton(item.item.id)}
                 overshootRight={false}>
                  <Animated.View exiting={SlideInLeft.delay(300)}>
                  <TouchableOpacity>
                          <View style={styles.card}>
                            <View style={styles.icon}>
                              <FontAwesome name="briefcase" size={30} color="blue" />
                            </View>
      
                            <View>
                            <Text style={styles.cardName}>{item.item?.data?.jobTitle}</Text>
                              <Text style={{fontFamily:'Pop',fontSize:14,maxWidth:150}}>{item?.item?.data?.employerName}</Text>
                              <Text style={{fontFamily:'Pop',fontSize:12,color:'grey'}}>{item.item?.data?.locationName}</Text>
                            </View>
                            <View style={{maxWidth:80}}>
                              <Text style={{fontFamily:'PopB',color:'#002695'}}>${item.item?.data?.maximumSalary}/</Text>
                            </View>
                          </View>
      
                        </TouchableOpacity>
                  </Animated.View>
                </Swipeable>
              )}
              
            />
             )
       }
    </Animated.ScrollView>
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
 },
 deleteBtn:{
    padding:20,
    alignItems:'center',
    backgroundColor:'red',
    borderRadius:30,
 }
})
export default Savejob