import { View, Text, TextInput, FlatList } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'
import { defaultStyle } from '@/components/styles'
import { Ionicons } from '@expo/vector-icons'
import { companyData } from '@/assets/Data/companyData'
import ChatRow from '@/components/ChatRow'

const message = () => {
  return (
     <Animated.ScrollView style={[defaultStyle.container,{paddingHorizontal:15,paddingTop:10}]}>
      <View style={[defaultStyle.searchbtn]}>
      <Ionicons name="search" size={24} color="black" />
      <TextInput placeholder='Search here' style={{width:220,fontSize:18,fontFamily:'PopSb'}} 
      placeholderTextColor={'grey'}/>
      </View>

      <View>
        <FlatList
         data={companyData}
         ItemSeparatorComponent={()=><View style={defaultStyle.separator}/>}
         renderItem={({item})=>(
            <ChatRow Data={item} />
         )}
        />
      </View>


     </Animated.ScrollView>
  )
}

export default message