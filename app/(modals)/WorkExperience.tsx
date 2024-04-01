import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { defaultStyle } from '@/components/styles'
import { TextInput } from 'react-native-gesture-handler'
import { EvilIcons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { db } from '@/firebase';
import { useRouter } from 'expo-router';




const WorkExperience = () => {
  const [jobTitle,setJobTitle] = useState('');
  const [companyName,setCompanyName] = useState('');
  const [showDatePicker,setShowDatePicker] = useState(false);
  const [startDate,setStartDate] = useState(new Date());
  const [EndDate,setEndDate] = useState(new Date());
  const [showEndDatePicker,setShowEndDatePicker] = useState(false);
  const router = useRouter();

  const SelectedDate = (date:any)=>{
    setStartDate(date);
    setShowDatePicker(false)
  }
  const EndSelectedDate = (date:any)=>{
    setEndDate(date)
    setShowEndDatePicker(false)
  }

  const SaveInformation = async ()=>{
     await db.collection('WorkExperience').add({
          title:jobTitle,
          companyName:companyName,
          startDate:startDate,
          endDate:EndDate
     })
     router.back();
  }

  return (
    <View style={[defaultStyle.container,{paddingHorizontal:20,gap:18}]}>
      <View style={{paddingTop:25,gap:10}}>
      <Text style={{fontFamily:'PopSb',color:'grey'}}>Title</Text>
      <TextInput placeholder='Job title' 
        placeholderTextColor={'grey'} style={defaultStyle.inputField}
        onChangeText={setJobTitle}/>
      </View>

      <View>
      <Text style={{fontFamily:'PopSb',color:'grey',paddingBottom:10}}>Company Name</Text>
      <TextInput placeholder='Company Name' 
        placeholderTextColor={'grey'} style={defaultStyle.inputField}
        onChangeText={setCompanyName}/>
      </View>
        
        {/**Date  */}
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        
        {/**Start date */}
        <View>
          <Text style={{fontFamily:'PopSb',color:'grey',paddingBottom:10}}>Start Date</Text>
          <View style={[defaultStyle.inputField,{width:150,flexDirection:'row',alignItems:'center'}]}>
            <Text style={{fontFamily:'PopSb',width:90}}>{startDate.toLocaleDateString()}</Text>
            <TouchableOpacity onPress={()=>setShowDatePicker(true)}>
            <EvilIcons name="calendar" size={28} color="blue" />
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={SelectedDate}
        onCancel={()=>setShowDatePicker(false)}
      />
        </View>
        
        {/**End Date */}
        <View>
          <Text style={{fontFamily:'PopSb',color:'grey',paddingBottom:10}}>End Date</Text>
          <View style={[defaultStyle.inputField,{width:150,flexDirection:'row',alignItems:'center'}]}>
            <Text style={{fontFamily:'PopSb',width:90}}>{EndDate.toLocaleDateString()}</Text>
            <TouchableOpacity onPress={()=>setShowEndDatePicker(true)}>
            <EvilIcons name="calendar" size={28} color="blue" />
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
        isVisible={showEndDatePicker}
        mode="date"
        onConfirm={EndSelectedDate}
        onCancel={()=>setShowEndDatePicker(false)}
      />
        </View>
      </View>
          {/**Button */}
          <TouchableOpacity style={[defaultStyle.btn,{marginTop:20}]}
          onPress={()=>SaveInformation()}>
          <Text style={defaultStyle.btnText}>Save</Text>
        </TouchableOpacity>
      
    </View>
  )
}

export default WorkExperience