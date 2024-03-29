import React from 'react';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';



export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
   <Tabs screenOptions={{tabBarActiveTintColor:"#002695"}}>
     <Tabs.Screen name='index' options={{
      tabBarLabel:'',tabBarIcon:({color,size})=><Entypo name='home' size={size} color={color}/>,
      headerShown:false
     }} />
     <Tabs.Screen name='savejob' options={{
       tabBarLabel:'',tabBarIcon:({color,size})=><FontAwesome name="bookmark" size={size} color={color}
       />,headerTitle:"Saved Jobs",headerTitleStyle:{fontFamily:'PopB',fontSize:22},headerShadowVisible:false
     }}/>
     <Tabs.Screen name='message' 
     options={{tabBarLabel:"",tabBarIcon:({color,size})=><MaterialCommunityIcons name="message-processing" size={size} color={color}/>
     }}/>
     <Tabs.Screen name='profile' options={{
      tabBarLabel:"",tabBarIcon:({color,size})=><Ionicons name="person" size={size} color={color} />
     }}/>
     
   </Tabs>
  );
}
