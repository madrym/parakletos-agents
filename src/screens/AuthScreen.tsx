import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button, Text, Surface} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useOAuth} from '@clerk/clerk-expo';
import {theme} from '../theme/theme';

export default function AuthScreen() {
  const {startOAuthFlow: startGoogleOAuth} = useOAuth({strategy: 'oauth_google'});
  const {startOAuthFlow: startAppleOAuth} = useOAuth({strategy: 'oauth_apple'});

  const handleGoogleSignIn = async () => {
    try {
      const {createdSessionId, setActive} = await startGoogleOAuth();
      if (createdSessionId) {
        setActive({session: createdSessionId});
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const {createdSessionId, setActive} = await startAppleOAuth();
      if (createdSessionId) {
        setActive({session: createdSessionId});
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Surface style={styles.header}>
          <Text variant="headlineLarge" style={styles.title}>
            Parakletos
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Your companion for Bible study, notes, and spiritual growth
          </Text>
        </Surface>

        <View style={styles.authButtons}>
          <Button
            mode="contained"
            onPress={handleGoogleSignIn}
            style={styles.button}
            icon="google">
            Continue with Google
          </Button>

          <Button
            mode="contained"
            onPress={handleAppleSignIn}
            style={styles.button}
            icon="apple">
            Continue with Apple
          </Button>

          <Text variant="bodySmall" style={styles.disclaimer}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
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
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.xxl,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
  },
  title: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
    color: theme.colors.onSurface,
  },
  authButtons: {
    gap: theme.spacing.md,
  },
  button: {
    paddingVertical: theme.spacing.sm,
  },
  disclaimer: {
    textAlign: 'center',
    color: theme.colors.onSurfaceVariant,
    marginTop: theme.spacing.md,
  },
}); 