import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import { companyData } from '@/assets/Data/companyData'
import { defaultStyle } from '@/components/styles';
import { Bubble, GiftedChat, IMessage, Send } from 'react-native-gifted-chat';
import messageData from '@/assets/Data/messages.json';
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const Page = () => {
    const [getInfo,setGetInfo] = useState<any>();
    const {id} = useLocalSearchParams();
    const [messages,setMessages] = useState<IMessage[]>([]);
    const insets = useSafeAreaInsets();
    useEffect(()=>{
        const info = companyData.find((data) => data.id === id);
        if (info) {
            setGetInfo(info);
        } else {
            // Handle case where no data is found for the given ID
            setGetInfo(null);
        }

    },[id])

    useEffect(()=>{
        setMessages([
          ...messageData.map((message) => {
            return {
              _id: message.id,
              text: message.msg,
              createdAt: new Date(message.date),
              user: {
                _id: message.from,
                name: message.from ? 'You' : 'Bob',
              },
            };
          }),
          {
            _id: 0,
            system: true,
            text: 'All your base are belong to us',
            createdAt: new Date(),
            user: {
              _id: 0,
              name: 'Bot',
            },
          },
    
        ])
    },[]);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages),
        )
      }, [])
  return (
    <View style={[defaultStyle.container,{marginBottom:insets.bottom}]}>
        <Stack.Screen
        options={{
            headerTitle:()=>(
                <View style={{flexDirection:"row",alignContent:'center',width:270,gap:10}}>
                    <View style={styles.image}>
                    <Image source={{uri:getInfo?.logo}}
                    style={{height:38,width:38, borderRadius:30,objectFit:"contain"}}/>
                    </View>
                    <View style={{alignContent:'center'}}>
                    <Text style={{fontFamily:'PopSb',fontSize:18}}>{getInfo?.name}</Text>
                    <Text style={{fontFamily:'Pop'}}>online</Text>
                    </View>
                </View>
            ),
            
        }}
        />
        
        <GiftedChat
      messages={messages}
      maxComposerHeight={100}
      renderAvatar={null}
      onSend={(messages:any) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={(props)=>{
        return<Bubble {...props}
        textStyle={{
          right:{
            color:"#fff"
          }
        }}
        wrapperStyle={{
          right:{
            backgroundColor:'#002695',
            padding:5
          }
        }}
        />
      }}
      renderSend={(props)=>(
        <View style={{flexDirection:'row',height:44,alignItems:'center',
          justifyContent:'center',gap:14,paddingHorizontal:14
        }}>
            <Send {...props} containerStyle={{justifyContent:'center',alignItems:"center"}}>
              <Ionicons name='send' color='#002695' size={28}/>
            </Send>
        </View>
      )}
    />
    </View>
  )
}

const styles = StyleSheet.create({
    image:{
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:'grey',
        borderRadius:40,
        padding:2,
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

export default Page