import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router';
import { Swipeable } from 'react-native-gesture-handler';
import { db } from '@/firebase';
import Animated, { SlideInRight } from 'react-native-reanimated';


interface Props{
    Data:any[]
    loading:boolean
}
const DeleteButton = (Id:any)=>{
  return(
    <Animated.View style={{marginHorizontal:20,paddingTop:18}} 
    entering={SlideInRight}>
      <TouchableOpacity style={styles.deleteBtn} onPress={()=>deleteExperience(Id)}>
       <AntDesign name="delete" size={20} color="white" />
    </TouchableOpacity>
    </Animated.View>
  )
}
const formatMonthYear = (timestamp:any) => {
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
};

const deleteExperience = async (Id:any)=>{
  try{
  await db.collection('WorkExperience').doc(Id).delete();
  }catch(err){
   console.log(err)
  }
}

const WorkExperienceCard = ({Data,loading}:Props) => {
  const router = useRouter();
  console.log(Data);
  return (
    <View style={{paddingHorizontal:20,paddingTop:30}}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontFamily:'PopB',fontSize:20}}>Work Experience</Text>
            <TouchableOpacity onPress={()=>router.navigate('(modals)/WorkExperience')}>
            <FontAwesome name="edit" size={24} color="black" />
            </TouchableOpacity>
           </View>
           
           <View style={{borderBottomWidth: 1, paddingBottom: 20, borderColor: '#e5e5e5' }}>
           {
            loading ? <ActivityIndicator color={'#002695'}/>:
            (
              <View>
                {
                 Data.map((item)=>(
                   <Swipeable renderRightActions={()=>DeleteButton(item?.id)} key={item?.id}>
                    <TouchableOpacity style={{padding:10}}>
                         <View style={{flexDirection:'row',gap:15,alignItems:'center'}}>
                             <View style={styles.imageContainer}>
                               <Image source={require('../assets/images/Job Finder Logo.png')}
                               style={styles.image}
                               />
                             </View>
                             <View>
                               <Text style={{fontFamily:'PopB',fontSize:18}}>{item?.date?.title}</Text>
                               <Text style={{fontFamily:'PopSb',fontSize:15,color:'grey'}}>{item?.date.companyName}</Text>
                               <Text style={{fontFamily:'PopSb',fontSize:15,color:'grey'}}>
                                {formatMonthYear(item?.date.startDate)} - {formatMonthYear(item?.date.endDate)}</Text>
                             </View>
                         </View>
                    </TouchableOpacity>
                   </Swipeable>
                 ))
                }
           </View>
            )
           }
        </View>
          
    </View>
  )
}

const styles = StyleSheet.create({
 deleteBtn:{
  padding:20,
  alignItems:'center',
  backgroundColor:'red',
  borderRadius:30,
},
image:{
 height:80,
 width:80,
 borderRadius:15
},
imageContainer:{
  elevation: 4,
  shadowColor: '#000',
  shadowOpacity: 0.3,
  shadowRadius: 4,
  shadowOffset: {
    width: 2,
    height: 2,
  }
}
})

export default WorkExperienceCard