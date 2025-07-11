import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import {ClerkProvider, SignedIn, SignedOut} from '@clerk/clerk-expo';
import {StatusBar} from 'react-native';

// Import screens
import AuthScreen from './src/screens/AuthScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';

// Import theme
import {theme} from './src/theme/theme';

const Stack = createStackNavigator();

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || '';

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
          <NavigationContainer>
            <SignedIn>
              <MainTabNavigator />
            </SignedIn>
            <SignedOut>
              <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Auth" component={AuthScreen} />
              </Stack.Navigator>
            </SignedOut>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </ClerkProvider>
  );
} 