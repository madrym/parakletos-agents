import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Import screens
import PrayerListScreen from '../screens/prayer/PrayerListScreen';
import PrayerCreateScreen from '../screens/prayer/PrayerCreateScreen';
import PrayerEditScreen from '../screens/prayer/PrayerEditScreen';
import PrayerViewScreen from '../screens/prayer/PrayerViewScreen';

// Import types
import {PrayerStackParamList} from '../types/navigation';

const Stack = createStackNavigator<PrayerStackParamList>();

export default function PrayerStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="PrayerList"
        component={PrayerListScreen}
        options={{
          title: 'Prayer Journal',
        }}
      />
      <Stack.Screen
        name="PrayerCreate"
        component={PrayerCreateScreen}
        options={{
          title: 'New Prayer',
        }}
      />
      <Stack.Screen
        name="PrayerEdit"
        component={PrayerEditScreen}
        options={{
          title: 'Edit Prayer',
        }}
      />
      <Stack.Screen
        name="PrayerView"
        component={PrayerViewScreen}
        options={{
          title: 'Prayer',
        }}
      />
    </Stack.Navigator>
  );
} 