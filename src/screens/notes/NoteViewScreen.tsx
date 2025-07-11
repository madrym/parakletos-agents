import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../../theme/theme';

export default function NoteViewScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineSmall" style={styles.title}>
          View Note
        </Text>
        <Text variant="bodyMedium" style={styles.placeholder}>
          Note viewer will be implemented here
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: theme.spacing.md,
    color: theme.colors.onBackground,
  },
  placeholder: {
    textAlign: 'center',
    color: theme.colors.onSurfaceVariant,
  },
}); 