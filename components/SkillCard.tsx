import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { db } from '@/firebase'
import { FlatList } from 'react-native-gesture-handler'

interface Props{
    Data:any[],
    loading:boolean
}

const skillIcons:{ [key: string]: any } = {
  'HTML.png': require('../assets/skillData/icons/HTML.png'),
  'CSS_tools.png':require('../assets/skillData/icons/CSS_tools.png'), 
  "CSS.png":require('../assets/skillData/icons/CSS.png'),
  "Photoshop.png":require('../assets/skillData/icons/Photoshop.png'),
  "JavaScript.png":require('../assets/skillData/icons/JavaScript.png'),
  "Java.png":require('../assets/skillData/icons/Java.png'),
  "JavaFX.png":require('../assets/skillData/icons/JavaFX.png'),
  "NodeJS.png":require('../assets/skillData/icons/NodeJS.png'),
  "Go.png":require('../assets/skillData/icons/Go.png'),
  "Python.png":require('../assets/skillData/icons/Python.png'),
  "Scrum.png":require('../assets/skillData/icons/Scrum.png'),
  "Coaching.png":require('../assets/skillData/icons/Coaching.png'),
  "MachineLearning.png":require('../assets/skillData/icons/MachineLearning.png'),
  "UI_UX_Design.png":require('../assets/skillData/icons/UI_UX_Design.png'),
  "React.png":require('../assets/skillData/icons/React.png'),
  "SEO.png":require('../assets/skillData/icons/SEO.png'),
  "Project_Coordination.png":require('../assets/skillData/icons/Project_Coordination.png'),
  "Stakeholder_Engagement.png":require('../assets/skillData/icons/Stakeholder_Engagement.png'),
  "Microsoft_Excel.png":require('../assets/skillData/icons/Microsoft_Excel.png'),
  "Microsoft_Outlook.png":require('../assets/skillData/icons/Microsoft_Outlook.png'),
  "Microsoft_Word.png":require('../assets/skillData/icons/Microsoft_Word.png'),
  "Commercial_Awareness.png":require('../assets/skillData/icons/Commercial_Awareness.png'),
  "Robot_Framework.png":require('../assets/skillData/icons/Robot_Framework.png'),
  "SAFe.png":require('../assets/skillData/icons/SAFe.png'),
  "TDD.png":require('../assets/skillData/icons/TDD.png'),
  "Conflict_Resolution.png":require('../assets/skillData/icons/Conflict_Resolution.png'),
  "Negotiation.png":require('../assets/skillData/icons/Negotiation.png'),
  "HR_Policies.png":require('../assets/skillData/icons/HR_Policies.png'),
  "Spring_Framework.png":require('../assets/skillData/icons/Spring_Framework.png'),
  "Git.png":require('../assets/skillData/icons/Git.png'),
  "Docker.png":require('../assets/skillData/icons/Docker.png'),
  "Redis.png":require('../assets/skillData/icons/Redis.png'),
  "PostgreSQL.png":require('../assets/skillData/icons/PostgreSQL.png'),
  "Facilitation.png":require('../assets/skillData/icons/qwe.png'),
  "badge-hr-consulting.png":require('../assets/skillData/icons/HR_Policies.png'),
  "qwe.png":require('../assets/skillData/icons/qwe.png'),
}

const SkillCard = ({Data,loading}:Props) => {
    const router = useRouter();
    const itemRow = 6
  return (
    <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 30}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontFamily: 'PopB', fontSize: 20 }}>Skills</Text>
        <TouchableOpacity onPress={() =>router.navigate('(modals)/Skills')}>
        <Ionicons name="add-circle-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{borderBottomWidth: 1, paddingBottom: 20, borderColor: '#e5e5e5' }}>
           <FlatList
            data={Data}
            renderItem={({item,index})=>(
               <View key={index} style={{marginHorizontal:6,marginVertical:15}}>
                   <Image source={skillIcons[item.Icon]}
               style={{width:50,height:50,borderRadius:13}}/>
               </View>
            )}
            numColumns={itemRow}/>
      </View>

    </View>
  )
}

export default SkillCard