import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Import screen navigators
import NotesStackNavigator from './NotesStackNavigator';
import BibleStackNavigator from './BibleStackNavigator';
import PrayerStackNavigator from './PrayerStackNavigator';
import StudyStackNavigator from './StudyStackNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';

// Import theme
import {theme} from '../theme/theme';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          switch (route.name) {
            case 'Notes':
              iconName = 'note-alt';
              break;
            case 'Bible':
              iconName = 'menu-book';
              break;
            case 'Prayer':
              iconName = 'favorite';
              break;
            case 'Study':
              iconName = 'group';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
            default:
              iconName = 'help';
              break;
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.placeholder,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        headerShown: false,
      })}>
      <Tab.Screen
        name="Notes"
        component={NotesStackNavigator}
        options={{
          tabBarLabel: 'Notes',
        }}
      />
      <Tab.Screen
        name="Bible"
        component={BibleStackNavigator}
        options={{
          tabBarLabel: 'Bible',
        }}
      />
      <Tab.Screen
        name="Prayer"
        component={PrayerStackNavigator}
        options={{
          tabBarLabel: 'Prayer',
        }}
      />
      <Tab.Screen
        name="Study"
        component={StudyStackNavigator}
        options={{
          tabBarLabel: 'Study',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
} 