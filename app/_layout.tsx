import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { SignIn, useAuth } from '@clerk/clerk-react';
import { View } from 'react-native';
import { Slot } from 'expo-router';
import InitialLayout from './InitialLayout';

const ClERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

const TokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  }
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();




export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Pop: require('../assets/fonts/Poppins-Regular.ttf'),
    PopSb: require('../assets/fonts/Poppins-SemiBold.ttf'),
    PopB: require('../assets/fonts/Poppins-Bold.ttf'),
    Rob_B: require('../assets/fonts/Roboto-Bold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (
    <RootLayoutNav />
    )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  return (
    <ClerkProvider publishableKey={ClERK_PUBLISHABLE_KEY!} tokenCache={TokenCache}>
      <InitialLayout/>
    </ClerkProvider>
  );
}
