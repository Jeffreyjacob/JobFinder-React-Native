import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-expo';
import { Stack, useRouter, useSegments } from 'expo-router';

const InitialLayout = () => {
    const { isLoaded, isSignedIn } = useAuth();
    const segments = useSegments();
    const router = useRouter();
    useEffect(() => {
        if (!isLoaded) return;
        console.log('User changed: ', isSignedIn);
        if (isSignedIn) {
            router.replace('/(tabs)/');
        } else if (!isSignedIn) {
            router.replace('/Login/login');
        }
    }, [isSignedIn]);
    return (
        <Stack screenOptions={{headerTintColor:"black",
        headerShadowVisible:false,headerBackTitleVisible:false,
        headerTitleStyle:{fontFamily:"PopB",fontSize:22}}}>
            <Stack.Screen name='(tabs)' options={{
                headerShown:false
            }}/>
            <Stack.Screen name='Signup/signup'
                options={{ headerTitle: "Register Account" }} />
            <Stack.Screen name='Login/login'
                options={{ headerShown: false }} />
            <Stack.Screen name='Signup/SignUpVerification'
                options={{ headerTitle: "Verification" }}
            />
            <Stack.Screen name='ForgetPassword/forgetPassword'
                options={{ headerTitle: '' }} />
            <Stack.Screen name='search'
             options={{
                headerTitle:"",
                animation:'slide_from_bottom'
            }} />
        </Stack>
    )
}

export default InitialLayout