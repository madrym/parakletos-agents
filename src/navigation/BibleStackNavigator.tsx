import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Import screens
import BibleReaderScreen from '../screens/bible/BibleReaderScreen';
import BibleSearchScreen from '../screens/bible/BibleSearchScreen';
import BibleBookmarksScreen from '../screens/bible/BibleBookmarksScreen';
import VerseAnnotationScreen from '../screens/bible/VerseAnnotationScreen';

// Import types
import {BibleStackParamList} from '../types/navigation';

const Stack = createStackNavigator<BibleStackParamList>();

export default function BibleStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="BibleReader"
        component={BibleReaderScreen}
        options={{
          title: 'Bible',
        }}
      />
      <Stack.Screen
        name="BibleSearch"
        component={BibleSearchScreen}
        options={{
          title: 'Search Bible',
        }}
      />
      <Stack.Screen
        name="BibleBookmarks"
        component={BibleBookmarksScreen}
        options={{
          title: 'Bookmarks',
        }}
      />
      <Stack.Screen
        name="VerseAnnotation"
        component={VerseAnnotationScreen}
        options={{
          title: 'Annotate Verse',
        }}
      />
    </Stack.Navigator>
  );
} 