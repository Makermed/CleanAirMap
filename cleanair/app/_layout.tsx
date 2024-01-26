import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider, Button } from 'react-native-paper';
import { client } from '../storage';
import { ApolloProvider } from '@apollo/client';
import { Modal } from '../common';
import { AuthButton, useFirebaseAuth} from '../auth';
import 'expo-dev-client'; // Turn on debugging.

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return(
    <ApolloProvider client={client}>
      <LoadingLayout/>
    </ApolloProvider>);
}

function LoadingLayout() {
  const [areFontsLoaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const isFirebaseAuthLoaded = useFirebaseAuth();

  const loaded = areFontsLoaded && isFirebaseAuthLoaded;
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
        <PaperProvider>
            <RootLayoutNav/>
            <Modal />
        </PaperProvider>);
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  return (
            <Stack
              screenOptions={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: 'blue',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerRight: () => (<AuthButton/>)
              }}
              >
                <Stack.Screen
                  name="index"
                  options={{ title: 'My home' }}
                />
            </Stack>
  );
}
