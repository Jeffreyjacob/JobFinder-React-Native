import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { defaultStyle } from '@/components/styles'

const AboutMe = () => {
  return (
    <View style = {[defaultStyle.container,{paddingHorizontal:20,gap:20}]}>
      <View style={{paddingTop:20}}>
        <Text style={{fontFamily:'PopSb',paddingBottom:15,color:'grey'}}>About</Text>
        <TextInput 
        style={styles.textInput}
        numberOfLines={5}
        multiline
        placeholder='*You can write about your workexperience and skills.People also talk about their achievement here.'
        placeholderTextColor={'grey'}/>
      </View>
        <View>
            <Text style={{fontFamily:'PopSb',paddingBottom:15,color:'grey'}}>
                Experience
            </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    textInput:{
       backgroundColor:'#eeeeee',
       height:130,
       borderRadius:15,
       padding:20,
       paddingTop:20,
       fontFamily:'Pop'
    }
})

export default AboutMe