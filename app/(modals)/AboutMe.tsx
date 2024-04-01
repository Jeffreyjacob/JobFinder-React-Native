import { View, Text, TextInput, StyleSheet,ActionSheetIOS, TouchableOpacity, Keyboard} from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyle } from '@/components/styles';
import { Picker } from '@react-native-picker/picker';
import { Link, router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { db } from '@/firebase';
import { date } from 'zod';


const AboutMe = () => {
    const [selectedExperience, setSelectedExperience] = useState('');
    const [selectLocation,setSelectLocation] = useState('Select Location');
    const [aboutMe,setAboutMe] = useState('');

    useEffect(()=>{
      const fetchdata = async ()=>{
       const querySnapShot = await db.collection('aboutme').doc('g5ocHgrsoVUfPaNVLeFV').get()
       .then(
           docs => {
              const items = docs.data();
              setAboutMe(items?.aboutme)
              setSelectedExperience(items?.experience);
              setSelectLocation(items?.location)
           }
       )
      }
      fetchdata()
    },[])
     
    const ShowSelectOption = (option:string)=>{
      Keyboard.dismiss()
      if(option === 'experience'){
        const options = ['1 years', '2 years', '3 years','4 years','More than 5 years',];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: options,
      },
      buttonIndex => {
        switch(buttonIndex){
          case 0:setSelectedExperience('1 year');
          break;
          case 1:setSelectedExperience('2 years');
          break;
          case 2:setSelectedExperience('3 years');
          break;
          case 3:setSelectedExperience('4 years');
          break;
          case 4:setSelectedExperience('5 years or more');
          break;
        }
      }
    );
 
      }
      if(option === 'location'){
        const options = ['California', 'illnois', 'New york','Texas','Michigan',];
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: options,
          },
          buttonIndex => {
            switch(buttonIndex){
              case 0:setSelectLocation('California');
              break;
              case 1:setSelectLocation('illnois');
              break;
              case 2:setSelectLocation('New york');
              break;
              case 3:setSelectLocation('Texas');
              break;
              case 4:setSelectLocation('Michigan');
              break;
            }
          }
        );
      }
    
    }
    const TextArea = (text:string)=>{
      setAboutMe(text)
    }

    const SaveInformation  = async ()=>{
         await db.collection('aboutme').doc('g5ocHgrsoVUfPaNVLeFV').update({
           aboutme:aboutMe,
           experience:selectedExperience,
           location:selectLocation
         })
         router.back()
    }
    return (
        <View style={[defaultStyle.container, { paddingHorizontal: 20, gap: 20 }]}>
            <View style={{ paddingTop: 20 }}>
                <Text style={{ fontFamily: 'PopSb', paddingBottom: 15, color: 'grey' }}>About</Text>
                <TextInput
                    style={styles.textInput}
                    numberOfLines={5}
                    multiline
                    value={aboutMe}
                    onChangeText={TextArea}
                    placeholder='*You can write about your workexperience and skills.People also talk about their achievement here.'
                    placeholderTextColor={'grey'}
                    blurOnSubmit={true}
                    onSubmitEditing={()=>Keyboard.dismiss()} />
            </View>
            <View>
                <Text style={{ fontFamily: 'PopSb', paddingBottom: 15, color: 'grey' }}>
                    Experience
                </Text>
                <TouchableOpacity style={defaultStyle.inputField} 
                onPress={()=>ShowSelectOption('experience')}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={{fontFamily:'PopSb'}}>{selectedExperience}</Text>
                    <AntDesign name="caretdown" size={16} color="black" />
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{ fontFamily: 'PopSb', paddingBottom: 15, color: 'grey' }}>
                    Location
                </Text>
                <TouchableOpacity style={defaultStyle.inputField} 
                onPress={()=>ShowSelectOption('location')}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={{fontFamily:'PopSb'}}>{selectLocation}</Text>
                    <AntDesign name="caretdown" size={16} color="black" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{paddingTop:10}}>
                <TouchableOpacity style={defaultStyle.btn} onPress={()=>SaveInformation()}>
                    <Text style={defaultStyle.btnText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#eeeeee',
        height: 130,
        borderRadius: 15,
        padding: 20,
        paddingTop: 20,
        fontFamily: 'Pop'
    }
})

export default AboutMe