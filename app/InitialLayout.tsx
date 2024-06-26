import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-expo';
import { Stack, useRouter, useSegments } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions={{
                headerTintColor: "black",
                headerShadowVisible: false, headerBackTitleVisible: false,
                headerTitleStyle: { fontFamily: "PopB", fontSize: 22 }
            }}>
                <Stack.Screen name='(tabs)' options={{
                    headerShown: false
                }} />
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
                        headerTitle: "Search",
                        animation: 'slide_from_bottom',
                    }} />
                <Stack.Screen name='JobListing/[Id]'
                    options={{
                        headerTitle: 'Job Details'
                    }} />
                <Stack.Screen name='(modals)/AboutMe'
                    options={{
                        presentation: 'modal',
                        headerTitle: 'Edit About',
                        headerShadowVisible: false,
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name='close-outline' size={22} />
                            </TouchableOpacity>
                        ),
                        headerBackTitleVisible: false
                    }} />
                <Stack.Screen name='(modals)/WorkExperience'
                    options={{
                        presentation: 'modal',
                        headerTitle: 'Edit Experience',
                        headerShadowVisible: false,
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name='close-outline' size={22} />
                            </TouchableOpacity>
                        ),
                        headerBackTitleVisible: false
                    }} />

                <Stack.Screen name='(modals)/Skills'
                    options={{
                        presentation: 'modal',
                        headerTitle: 'Add Skills',
                        headerShadowVisible: false,
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name='close-outline' size={22} />
                            </TouchableOpacity>
                        ),
                        headerBackTitleVisible: false
                    }} />


            </Stack>
        </GestureHandlerRootView>
    )
}

export default InitialLayout