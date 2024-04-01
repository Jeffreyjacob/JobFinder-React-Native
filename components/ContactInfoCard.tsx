import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { useUser } from '@clerk/clerk-expo';

const ContactInfoCard = () => {
    const {user} = useUser();
  return (
    <View style={{flex:1,paddingHorizontal:20,paddingTop:45,gap:20}}>
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontFamily:'PopB',fontSize:20}}>Contact Information</Text>
            <TouchableOpacity>
            <FontAwesome name="edit" size={24} color="black" />
            </TouchableOpacity>
           </View>
            {/**EMail address */}
            <View>
            <Text style={{fontFamily:"PopB",fontSize:16}}>Email Address</Text>
            <Text style={{fontFamily:'Pop',fontSize:16}}>
              {user?.primaryEmailAddress?.emailAddress}
              </Text>
            </View>
            {/**number */}
            <View>
            <Text style={{fontFamily:"PopB",fontSize:16}}>Mobile Number</Text>
            <Text style={{fontFamily:'Pop',fontSize:16}}>
              +23479884444
              </Text>
            </View>

            <View style={{borderBottomWidth:1,paddingBottom:20,borderColor:'#e5e5e5'}}>
            <Text style={{fontFamily:"PopB",fontSize:16}}>Website</Text>
            <Text style={{fontFamily:'Pop',fontSize:16}}>
              //Website lInk////
              </Text>
            </View>
          
         </View>
  )
}

export default ContactInfoCard