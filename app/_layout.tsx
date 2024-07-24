import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import React from 'react';
import client from './services';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ApolloProvider } from '@apollo/client';
import HomeScreen from './pages/home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LaunchDetails from './pages/details';
import { Platform } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  const Stack = createNativeStackNavigator();

  return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ApolloProvider client={client}>
          <Stack.Navigator>
            <Stack.Screen name="pages/home" component={HomeScreen} />
            <Stack.Group 
            screenOptions={{ 
              animation:"slide_from_bottom", 
              presentation: Platform.OS === 'ios' ? 'modal' : 'transparentModal'
            }}>
              <Stack.Screen name="pages/details" component={LaunchDetails} />
            </Stack.Group>
          </Stack.Navigator>
        </ApolloProvider>
      </ThemeProvider>
  );
}
