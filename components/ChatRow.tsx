import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';

interface ChatProps{
    Data:any
}

const ChatRow = ({Data}:ChatProps) => {
  return (
    <View>
       <Link href={`/ChatDetails/${Data.id}`} asChild>
         <TouchableOpacity style={{paddingVertical:10,flexDirection:'row',alignItems:'center',
            justifyContent:"space-between"
         }}>
            <View style={{flexDirection:'row',alignItems:"center",gap:10}}>
            <View style={styles.image}>
                <Image source={{uri:Data.logo}}
                style={[{height:55,width:55,objectFit:'contain',borderRadius:40,}]}/>
            </View>
            <View>
                <Text style={{fontSize:18,fontFamily:"PopB"}}>{Data.name}</Text>
                <Text style={{fontSize:15,fontFamily:"Pop"}}>{Data.message}</Text>
            </View>
            </View>
            <View>
              <Text style={{color:"#6E6E73"}}>{Data.time}</Text>
            </View>
          
         </TouchableOpacity>
       </Link>
    </View>
  )
}

const styles = StyleSheet.create({
    image:{
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:'grey',
        borderRadius:40,
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

export default ChatRow