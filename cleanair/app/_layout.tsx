import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { client } from '../storage';
import { ApolloProvider } from '@apollo/client';
import { AuthButton, useFirebaseAuth} from '../auth';
import { GluestackUIProvider } from "@gluestack-ui/themed"
import UserMenu from '../common/components/UserMenu';
import config from "../gluestack-style.config"
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';
import 'expo-dev-client'; // Turn on debugging.

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
        <GluestackUIProvider config={config}>
            <RootLayoutNav/>
        </GluestackUIProvider>);
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
                headerRight: () => (<UserMenu />)
              }}
              >
                <Stack.Screen
                  name="index"
                  options={{ title: 'Clean Air Map' }}
                />
                <Stack.Screen
                  name="login"
                  options={{
                    title: 'Clean Air Map | Login',
                    presentation: 'transparentModal',
                  }}
                />
            </Stack>
  );
}
