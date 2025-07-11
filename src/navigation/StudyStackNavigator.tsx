import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Import screens
import StudyListScreen from '../screens/study/StudyListScreen';
import StudyCreateScreen from '../screens/study/StudyCreateScreen';
import StudyEditScreen from '../screens/study/StudyEditScreen';
import StudyViewScreen from '../screens/study/StudyViewScreen';
import StudySessionScreen from '../screens/study/StudySessionScreen';

// Import types
import {StudyStackParamList} from '../types/navigation';

const Stack = createStackNavigator<StudyStackParamList>();

export default function StudyStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="StudyList"
        component={StudyListScreen}
        options={{
          title: 'Study Groups',
        }}
      />
      <Stack.Screen
        name="StudyCreate"
        component={StudyCreateScreen}
        options={{
          title: 'Create Study',
        }}
      />
      <Stack.Screen
        name="StudyEdit"
        component={StudyEditScreen}
        options={{
          title: 'Edit Study',
        }}
      />
      <Stack.Screen
        name="StudyView"
        component={StudyViewScreen}
        options={{
          title: 'Study Details',
        }}
      />
      <Stack.Screen
        name="StudySession"
        component={StudySessionScreen}
        options={{
          title: 'Study Session',
        }}
      />
    </Stack.Navigator>
  );
} 