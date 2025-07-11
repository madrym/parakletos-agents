import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Import screens
import NotesListScreen from '../screens/notes/NotesListScreen';
import NoteCreateScreen from '../screens/notes/NoteCreateScreen';
import NoteEditScreen from '../screens/notes/NoteEditScreen';
import NoteViewScreen from '../screens/notes/NoteViewScreen';

// Import types
import {NotesStackParamList} from '../types/navigation';

const Stack = createStackNavigator<NotesStackParamList>();

export default function NotesStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="NotesList"
        component={NotesListScreen}
        options={{
          title: 'My Notes',
        }}
      />
      <Stack.Screen
        name="NoteCreate"
        component={NoteCreateScreen}
        options={{
          title: 'New Note',
        }}
      />
      <Stack.Screen
        name="NoteEdit"
        component={NoteEditScreen}
        options={{
          title: 'Edit Note',
        }}
      />
      <Stack.Screen
        name="NoteView"
        component={NoteViewScreen}
        options={{
          title: 'Note',
        }}
      />
    </Stack.Navigator>
  );
} 