import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { defaultStyle } from '@/components/styles';
import Animated, { interpolate, interpolateColor, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { useNavigation, useRouter } from 'expo-router';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  const { signOut, isSignedIn } = useAuth()
  const {user} = useUser();
  const { width } = Dimensions.get('window')
  const IMG_HEIGHT = 300
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const navigation = useNavigation();
  const router = useRouter();

  const imageAnimatedStyle = useAnimatedStyle(()=>{
    return{
      transform:[
        {
          translateY:interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT,10,IMG_HEIGHT],
            [-IMG_HEIGHT/2,0,IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale:interpolate(
            scrollOffset.value,[-IMG_HEIGHT,0,IMG_HEIGHT],[2,1,1]
          )
        }
      ]
    }
  })
  const headerAnimatedStyle = useAnimatedStyle(()=>{
    return {
      opacity:interpolate(scrollOffset.value,[0,IMG_HEIGHT / 1.5],[0,1])
    }
  })

  const headerColor = useAnimatedStyle(()=>{
    return{
      color: interpolateColor(scrollOffset.value, [0, IMG_HEIGHT],['white','black']),
    }
  })
 useLayoutEffect(()=>{
    navigation.setOptions({
      headerBackground:()=>(
        <Animated.View style={[headerAnimatedStyle,styles.header]}/>
      ),
      headerRight:()=>(
        <TouchableOpacity style={[{marginRight:15}]} onPress={()=>signOut()}>
          <AntDesign name="setting" size={24} color='black' />
        </TouchableOpacity>
      ),
      headerLeft:()=>(
        <View style={{paddingLeft:15}}>
          <Text style ={[{fontFamily:'PopB',fontSize:23}]}>Profile</Text>
        </View>
      )
    })
 },[])
 const cameraUpload = async ()=>{
  try{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
     console.log(result)
    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file:base64
      })
    }
  }catch(err){
    console.log(err)
  }

 }
  return (
    <View style={defaultStyle.container}>
      <Animated.ScrollView
       ref={scrollRef}
       scrollEventThrottle={16}>
        <Animated.View style={imageAnimatedStyle}>
          <Animated.Image source={{uri:user?.imageUrl}}
          style={[{height:IMG_HEIGHT,width}]}
          />
          <Animated.View style={[styles.overlay,{height:IMG_HEIGHT,width}]} />

          <View style={{position:'absolute',top:235,left:19}}>
          <Text style={{fontFamily:'PopSb',fontSize:25,color:'white'}}>
            {user?.fullName}
          </Text>
          <Text style={{fontFamily:'Pop',fontSize:16,color:'white'}}>
            Jr Frontend/Mobile app Developer
          </Text>
          </View>
              <TouchableOpacity  style={styles.cameraBtn}
              onPress={()=>cameraUpload()}>
              <Entypo name="camera" size={22} color="white" />
              </TouchableOpacity>
          </Animated.View>
         
         {/** Contact information*/}
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

            <View>
            <Text style={{fontFamily:"PopB",fontSize:16}}>Website</Text>
            <Text style={{fontFamily:'Pop',fontSize:16}}>
              //Website lInk////
              </Text>
            </View>
          
         </View>

         {/**About Me */}
         <View style={{flex:1,paddingHorizontal:20,paddingTop:45,gap:20}}>
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontFamily:'PopB',fontSize:20}}>About me</Text>
            <TouchableOpacity onPress={()=>router.navigate('(modals)/AboutMe')}>
            <FontAwesome name="edit" size={24} color="black" />
            </TouchableOpacity>
           </View>
      
          
          
         </View>
        
          
        
      </Animated.ScrollView>
  </View>
  )
}
 const styles = StyleSheet.create({
  overlay:{
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cameraBtn:{
    flexDirection:'row',
    backgroundColor:'#002695',
    justifyContent:"center",
    paddingVertical:15,
    borderRadius:40,
    width:55,
    height:55,
    position:"absolute",
    right:15,
    bottom:-28,
    borderWidth:3,
    borderColor:'white'
  },
  header:{
    backgroundColor: '#fff',
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
  }
 })
export default Profile