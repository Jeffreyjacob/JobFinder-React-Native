import {
    View, Text, SafeAreaView, StyleSheet,
    Image, TextInput, TouchableOpacity, Alert, ActivityIndicator
} from 'react-native';
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Controller, useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { defaultStyle } from '@/components/styles';
import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser';

type formValue = {
    email: string,
    password: string,
}
const formSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});
enum Strategy {
    Google = 'oauth_google',
    Apple = 'oauth_apple',
    Facebook = 'oauth_facebook'
 }

const login = () => {
    useWarmUpBrowser();
    const { control, handleSubmit } = useForm<formValue>({ resolver: zodResolver(formSchema) })
    const [loading, setLoading] = useState(false)
    const {isLoaded,signIn,setActive} = useSignIn();
    const router = useRouter()
    const {startOAuthFlow:appleAuth} = useOAuth({strategy:'oauth_apple'});
    const {startOAuthFlow:googleAuth} = useOAuth({strategy:'oauth_google'});
    const {startOAuthFlow:facebookAuth} = useOAuth({strategy:'oauth_facebook'});

    const onSubmit = async (data:formValue) => {
        setLoading(true)
        if(!isLoaded && !signIn){
            return;
        } 
        try {
            const completeSignIn = await signIn.create({
              identifier: data.email,
              password:data.password
            });
            await setActive({ session: completeSignIn.createdSessionId });
            setLoading(false)
          } catch (err: any) {
            Alert.alert(JSON.stringify(err.errors, null, 2))
            setLoading(false);
          }


    }
    const onSelectAuth = async (strategy: Strategy)=>{
        const selectedAuth = {
          [Strategy.Google]:googleAuth,
          [Strategy.Apple]:appleAuth,
          [Strategy.Facebook]:facebookAuth,
        }[strategy]
        try{
           const {createdSessionId,setActive} = await selectedAuth();
           console.log('created session',createdSessionId)
           if(createdSessionId){
              setActive!({session:createdSessionId})
              router.back()
           }
        }catch(err){
          console.error(err)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Image source={require('../../assets/images/Job Finder Logo.png')}
                    style={{ width: 120, height: 120, justifyContent: 'center' }} />
            </View>
            <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                <Text style={{ textAlign: 'center', fontFamily: 'PopB', fontSize: 25 }}>
                    Login to your Account
                </Text>

                {/**Login form */}
                <View style={{ gap: 10, paddingTop: 30 }}>

                    <Controller
                        control={control}
                        name={'email'}
                        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.fieldLabel}>
                                        Email
                                    </Text>
                                    <Text style={{ color: "red", fontFamily: "PopSb" }}>* </Text>
                                </View>
                                <TextInput placeholder='Enter Email'
                                    style={defaultStyle.inputField} value={value} onChangeText={onChange}
                                    onBlur={onBlur} />
                                {error && <Text style={styles.errorMessage}>
                                    {error.message}
                                </Text>
                                }
                            </View>
                        )}
                    />


                    <Controller
                        control={control}
                        name={'password'}
                        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.fieldLabel}>
                                        Password
                                    </Text>
                                    <Text style={{ color: "red", fontFamily: "PopSb" }}>* </Text>
                                </View>
                                <TextInput placeholder='Enter Password'
                                    style={defaultStyle.inputField} value={value}
                                    onChangeText={onChange} onBlur={onBlur} secureTextEntry />
                                {error && <Text style={styles.errorMessage}>
                                    {error.message}
                                </Text>
                                }
                            </View>
                        )}
                    />


                    {/**forget password */}
                    <View style={{ flexDirection: "row", justifyContent: 'flex-end', paddingBottom: 15 }}>
                        <Link href={'/ForgetPassword/forgetPassword'} asChild >
                            <Text style={{
                                color: "#002695",
                                fontFamily: "PopSb",
                                textDecorationLine: 'underline'
                            }}>
                                ForgetPassword
                            </Text>
                        </Link>
                    </View>

                    {/**Button */}
                    <TouchableOpacity style={styles.btn}
                        onPress={handleSubmit(onSubmit)}>
                        {
                            loading ? <ActivityIndicator color={'#fff'} /> :
                                <Text style={styles.btnText}>Login</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>

            {/**social logins */}
            <View style={{ justifyContent: 'center', paddingTop: 40 }}>
                <Text style={{ fontFamily: "PopSb", fontSize: 18, textAlign: 'center' }}>Or Continue With</Text>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-evenly',
                    paddingHorizontal: 20, paddingTop: 25
                }}>
                    <TouchableOpacity style={styles.socialBtn} onPress={()=>onSelectAuth(Strategy.Facebook)}>
                        <Ionicons name='logo-facebook' size={28} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialBtn} onPress={()=>onSelectAuth(Strategy.Google)}>
                        <Ionicons name='logo-google' size={28} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialBtn} onPress={()=>onSelectAuth(Strategy.Apple)}>
                        <Ionicons name='logo-apple' size={28} />
                    </TouchableOpacity>
                </View>
            </View>

            {/**Signup text */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 100 }}>

                <Text style={{ fontFamily: 'PopSb' }}>
                    Don't have an account ?
                </Text>
                <Link href={'/Signup/signup'} asChild>
                    <Text style={{ fontFamily: 'PopSb', color: "#002695" }}>Register now</Text>
                </Link>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    fieldLabel: {
        fontFamily: 'Pop',
        fontSize: 17,
        color: '#909090'
    },
    inputField: {
        backgroundColor: '#eeeeee',
        height: 50,
        padding: 16,
        borderRadius: 10
    },
    btn: {
        backgroundColor: "#002695",
        height: 60,
        borderRadius: 13,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontFamily: "PopSb",
        color: '#fff',
        fontSize: 16,
    },
    socialBtn: {
        borderWidth: StyleSheet.hairlineWidth,
        paddingVertical: 11,
        paddingHorizontal: 15,
        borderRadius: 13
    },
    errorMessage: {
        color: 'red',
        paddingTop: 10
    }

})

export default login