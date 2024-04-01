import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { defaultStyle } from '@/components/styles';
import Animated, { interpolate, interpolateColor, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { useNavigation, useRouter } from 'expo-router';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { db } from '@/firebase';
import WorkExperienceCard from '@/components/WorkExperienceCard';
import AboutMeCard from '@/components/AboutMeCard';
import ContactInfoCard from '@/components/ContactInfoCard';


const Profile = () => {
  const { signOut, isSignedIn } = useAuth()
  const {user} = useUser();
  const { width } = Dimensions.get('window')
  const IMG_HEIGHT = 300
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const navigation = useNavigation();
  const router = useRouter();
  const [AboutMe,setAboutMe] = useState<any>([])
  const [WorkExperience,setWorkExperience] = useState<any>([])
  const [loading,setloading] = useState(false)

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
      opacity:interpolate(scrollOffset.value,[0,IMG_HEIGHT / 1.8],[0,1])
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
  useEffect(()=>{
    setloading(true)
    const fetchAboutme = async ()=>{
      const querySnapShot = await db.collection('aboutme').doc('g5ocHgrsoVUfPaNVLeFV').get()
      .then(
          docs => {
             const items = docs.data();
             setAboutMe(items)
             setloading(false)
          }
      )
     }
     const FetchWorkExperience = async ()=>{
        const querySnapShot = await db.collection('WorkExperience').onSnapshot(
          doc =>{
            const items = doc.docs.map(res =>({
               id:res.id,
               date:res.data()
            }))
            setWorkExperience(items)
            setloading(false)
            console.log(items)
          }
        )
     }


     
    fetchAboutme()
    FetchWorkExperience()
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
        <Animated.View>
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
         <ContactInfoCard/>

         {/**About Me */}
          <AboutMeCard Data={AboutMe} loading={loading}/>

         {/**Work Experience */}
         <WorkExperienceCard Data={WorkExperience} loading={loading}/>
     
        
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