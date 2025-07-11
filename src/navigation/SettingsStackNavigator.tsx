import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Import screens
import SettingsMainScreen from '../screens/settings/SettingsMainScreen';
import ProfileScreen from '../screens/settings/ProfileScreen';
import AppSettingsScreen from '../screens/settings/AppSettingsScreen';
import DataSyncScreen from '../screens/settings/DataSyncScreen';
import AboutScreen from '../screens/settings/AboutScreen';

// Import types
import {SettingsStackParamList} from '../types/navigation';

const Stack = createStackNavigator<SettingsStackParamList>();

export default function SettingsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="SettingsMain"
        component={SettingsMainScreen}
        options={{
          title: 'Settings',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="AppSettings"
        component={AppSettingsScreen}
        options={{
          title: 'App Settings',
        }}
      />
      <Stack.Screen
        name="DataSync"
        component={DataSyncScreen}
        options={{
          title: 'Data & Sync',
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'About',
        }}
      />
    </Stack.Navigator>
  );
} 