import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, FAB} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../../theme/theme';

export default function NotesListScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineSmall" style={styles.title}>
          My Notes
        </Text>
        <Text variant="bodyMedium" style={styles.placeholder}>
          No notes yet. Start by creating your first note!
        </Text>
      </View>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          // TODO: Navigate to NoteCreate screen
        }}
      />
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
  fab: {
    position: 'absolute',
    margin: theme.spacing.md,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
}); 