import { View, Text, TouchableOpacity, Share, Alert, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { defaultStyle } from '@/components/styles'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'
import axios from 'axios';
import { WebView } from 'react-native-webview';
import Animated, { SlideInDown } from 'react-native-reanimated';


const Page = () => {
    const navigation = useNavigation();
    const { Id } = useLocalSearchParams<{ Id: string }>();
    const [JobDetails, setJobDetails] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const apiKey = 'ab2c0f58-640c-4e32-90be-1b85db792b6b'
    useEffect(() => {
        const username = apiKey
        const password = ''

        // Create a base64 encoded string from the credentials
        const base64Credentials = btoa(`${username}:${password}`);
        const header = {
            'Authorization': `Basic ${base64Credentials}`,
        }
        const fetchJob = async () => {
            setLoading(true)
            try {
                const Job = await axios.get(`https://www.reed.co.uk/api/1.0/jobs/${Id}`, { headers: header })
                    .then(res => {
                        console.log(res.data)
                        setJobDetails(res.data)
                        setLoading(false);
                    })
            } catch (err) {
                Alert.alert('Something went wrong')
            }

        }
        fetchJob()
    }, [Id])

    const SharingJob = async () => {
        try {
            await Share.share({
                title: JobDetails?.jobTitle,
                url: JobDetails?.jobUrl
            })
        } catch (err) {
            console.log(err)
        }
    }



    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <TouchableOpacity onPress={() => SharingJob()}>
                <Entypo name="share" size={24} color="black" />
            </TouchableOpacity>
        })
    }, [])
    const fontSize = 40
    const fontSizeStyle = `font-size: ${fontSize}px;`;

    const modifiedHTMLContent = JobDetails?.jobDescription?.replace(/<[^>]+>/g, (match: any) => {
        // Check if the matched element is not a style tag
        if (!match.startsWith('<style')) {
            // Add the font size style to the matched element
            return match.replace('>', ` style="${fontSizeStyle}">`);
        }
        return match;
    });
    const htmlContent = modifiedHTMLContent

    return (
        <View style={defaultStyle.container}>
            {
                loading ? <ActivityIndicator color={'#002695'} style={{ paddingTop: 200 }} /> :
                    (
                        <Animated.ScrollView style={{ paddingHorizontal: 18, paddingTop: 10 }}>
                            <View style={{ paddingTop: 5 }}>
                                <TouchableOpacity>
                                    <View style={styles.card}>
                                        <View style={styles.imageContainer}>
                                            <View style={styles.image}>
                                                <Image source={require('../../assets/images/Job Finder Logo.png')}
                                                    style={styles.image}
                                                />
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={styles.cardName}>{JobDetails?.jobTitle}</Text>
                                            <Text style={{ fontFamily: 'Pop', fontSize: 14 }}>{JobDetails?.employerName}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={{
                                    flexDirection: 'row', justifyContent: 'space-between',
                                    paddingHorizontal: 10, paddingTop: 15
                                }}>
                                    <Text style={{ fontFamily: 'PopSb', fontSize: 16, color: 'grey' }}>Salary</Text>
                                    <Text style={{ fontFamily: 'PopSb', fontSize: 17, color: '#002695' }}>
                                        {JobDetails?.salary}
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row', justifyContent: 'space-between',
                                    paddingHorizontal: 10, paddingTop: 10, borderBottomWidth: StyleSheet.hairlineWidth,
                                    paddingBottom: 30
                                }}>
                                    <Text style={{ fontFamily: 'PopSb', fontSize: 16, color: 'grey' }}>Location</Text>
                                    <Text style={{ fontFamily: 'PopSb', fontSize: 17, color: '#002695' }}>
                                        {JobDetails?.locationName}
                                    </Text>

                                </View>
                                <View style={{ paddingHorizontal: 10, paddingTop: 15 }}>
                                    <Text style={{ fontFamily: "PopB", fontSize: 20, color: '#002695', paddingBottom: 10 }}>
                                        Job Description
                                    </Text>
                                    <WebView
                                        style={styles.webview}
                                        originWhitelist={['*']}
                                        source={{ html: htmlContent }}

                                    />

                                </View>


                            </View>
                            <Animated.View style={{ padding: 15 }} entering={SlideInDown.delay(200)} >
                                <TouchableOpacity style={defaultStyle.btn}>
                                    <Text style={defaultStyle.btnText}>
                                        Apply
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </Animated.ScrollView>
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: "#eeeeee",
        marginVertical: 8,
        borderRadius: 10,
        gap: 10,
        alignItems:'center'
    },
    cardName: {
        fontFamily: "PopSb",
        fontSize: 16,
        width: 260,
    },
    image:{
        height:60,
        width:60,
        borderRadius:15
       },
       imageContainer:{
         elevation: 4,
         shadowColor: '#000',
         shadowOpacity: 0.3,
         shadowRadius: 4,
         shadowOffset: {
           width: 2,
           height: 2,
         }
       },
    webview: {
        height: 400,

    },
})

export default Page