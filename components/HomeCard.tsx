import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const HomeCard = () => {
  return (
    <View style={styles.card}>
        <View style={{}}>
        <Text style={{fontFamily:"PopB",color:'white',fontSize:23,width:170}}>
            How to find  a perfect Job for ....
            </Text>
        <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Read more</Text>
        </TouchableOpacity>
        </View>
        <Image source={require('../assets/images/AdobeStock_641269594_Preview.png')}
        style={styles.image}/>
    </View>
  )
}

const styles = StyleSheet.create({

    card:{
        backgroundColor:'#fd5c63',
        width:"100%",
        height:200,
        borderRadius:10,
        flexDirection:"row",
        alignItems:"center",
        paddingLeft:30,
        marginTop:30
    },
    image:{
       width:150,
       height:200,
       position:'absolute',
       right:2
    },
    btn:{
       backgroundColor:'#002695',
       width:120,
       paddingHorizontal:10,
       paddingVertical:10,
       borderRadius:20,
       marginTop:20
    },
    btnText:{
      textAlign:'center',
      fontFamily:'PopSb',
      color:'white'

    }
})

export default HomeCard