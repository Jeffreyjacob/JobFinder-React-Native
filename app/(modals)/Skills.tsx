import { View, Text, StyleSheet, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { defaultStyle } from '@/components/styles'
import { AntDesign, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler';
import { skillData } from '@/assets/skillData/skills';
import Animated from 'react-native-reanimated';
import { db } from '@/firebase';
import { router, useRouter } from 'expo-router';


const Skills = () => {
  const [filter,setFilter] = useState('');
  const [filterData,setFilterData] = useState<any[]>([]);
  const [addSkill,setAddSkill] = useState<any[]>([]);
  const windowWidth = useWindowDimensions().width;
  const router = useRouter();

  useEffect(()=>{

    const fetchSkills = async ()=>{
       const skill = skillData.filter( 
        (item)=> item.name.toLowerCase().includes(filter.toLowerCase())
        )
       setFilterData(skill)
       const item = await db.collection('Skills').doc('FsoFR2G5ifkbwiAOWMbF').get()
        setAddSkill(item.data()?.addSkill)
      
    }
     fetchSkills();
  },[filter])
   const itemRow = 3
   
   const calculateItemsPerRow = (textWidth:any) => {
    // Adjust the threshold value as needed
    const threshold = 200; // Adjust this value based on your design
    return Math.floor(windowWidth / (textWidth + threshold));
  };

  const AddSkill = (NewSkill:any,icon:any)=>{
    if (!addSkill.some(item => item.skill === NewSkill)) {
      const newItem = { id: Math.random().toString(), skill: NewSkill, Icon: icon };
      setAddSkill([...addSkill, newItem]);
    }
    if(addSkill.some(item => item.skill === NewSkill)){
      const updatedSkills = addSkill.filter((skill)=>skill.skill !== NewSkill)
      setAddSkill(updatedSkills);
    }
  }

  const SaveSkills = async ()=>{
     await db.collection('Skills').doc('FsoFR2G5ifkbwiAOWMbF').update({addSkill});
     router.back();
  }

  return (
    <View style={[defaultStyle.container,{paddingHorizontal:20,gap:18}]}>
      {/**search bar */}
      <View style={[styles.searchbtn]}>
      <Ionicons name="search" size={24} color="black" />
      <TextInput placeholder='Search here (e.g Data Analysis)'
       style={{width:220,fontSize:18,fontFamily:'PopSb'}} 
      placeholderTextColor={'grey'} onChangeText={setFilter}/>
      </View>
      <Text style={{fontFamily:'PopSb',color:'grey'}}>
        Recommanded skills based on your Profile
        </Text>
           <Animated.ScrollView>
            <View>
              {
                <FlatList
                  data={filterData}
                  renderItem={({item,index})=>(
                    <TouchableOpacity key={index}
                    onPress={()=>AddSkill(item.name,item?.skillIcon)}>
                      <View style={[styles.skillcard, addSkill.some(skill => skill.skill === item.name) && styles.skillcardSelected]}>
                        <Text style={[styles.skilltext,addSkill.some(skill => skill.skill === item.name) && styles.skillselectedText]}>
                          {item.name}
                          </Text>
                          {
                            addSkill.some(skill =>skill.skill === item.name) ? 
                            
                            (
                              <AntDesign name="check" size={14} color="white" />
                            ):(
                              <FontAwesome6 name="add" size={14} color="grey" />
                            )
                          }
                      </View>
                  </TouchableOpacity>
                  )}
                  numColumns={itemRow}
                />
              }
        
            </View>
            {/** Save button */}
            <TouchableOpacity onPress={()=>SaveSkills()}
            style={[defaultStyle.btn,{marginBottom:30,marginTop:20}]}>
              <Text style={defaultStyle.btnText}>Save</Text>
            </TouchableOpacity>
           </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  searchbtn:{
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    width: "100%",
    backgroundColor: "#eeeeee",
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
  },
  skillcard:{
     borderWidth:2,
     padding:10,
     marginVertical:8,
     marginHorizontal:5,
     borderRadius:20,
     borderColor:'grey',
     flexDirection:'row',
     gap:6
     
  },
  skillcardSelected:{
    borderWidth:2,
     padding:10,
     marginVertical:5,
     marginHorizontal:5,
     backgroundColor:'#002695',
     borderRadius:20,
     borderColor:'#002695',
     flexDirection:'row',
     gap:6
  },
  skilltext:{
    fontSize:13,
    fontFamily:'PopSb',
    color:'grey'
  },
  skillselectedText:{
    fontSize:13,
    fontFamily:'PopSb',
    color:'white'
  }
  
})

export default Skills