import {DefaultTheme} from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6366f1', // Indigo
    secondary: '#8b5cf6', // Purple
    accent: '#10b981', // Emerald
    background: '#f8f9fa', // Light gray
    surface: '#ffffff',
    text: '#1f2937', // Dark gray
    placeholder: '#6b7280', // Medium gray
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#ef4444', // Red
    success: '#10b981', // Green
    warning: '#f59e0b', // Amber
    info: '#3b82f6', // Blue
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'System',
      fontWeight: '400' as const,
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500' as const,
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700' as const,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
}; 