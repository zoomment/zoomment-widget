import React from 'react';
import { ThemeProvider } from 'styled-components';

const themes = {
  black: {
    // Text colors
    textColor: '#fff',
    textMuted: '#afb0b1',
    // Deprecated: use textMuted instead
    textColorSecondary: '#afb0b1',
    // Backgrounds
    inputBackground: '#000',
    // Borders
    borderColor: '#2d2d2d',
    // Primary button
    buttonBackground: '#1677ff',
    buttonBackgroundHover: '#4096ff',
    buttonColor: '#fff',
    // Semantic colors
    successColor: '#22c55e',
    errorColor: '#ef4444',
    verifiedColor: '#22c55e',
    // Vote colors
    voteUpColor: '#22c55e',
    voteDownColor: '#ef4444',
    // Link colors
    linkColor: '#1677ff',
    linkColorHover: '#4096ff'
  },
  dark: {
    // Text colors
    textColor: '#fff',
    textMuted: '#606984',
    // Deprecated: use textMuted instead
    textColorSecondary: '#606984',
    // Backgrounds
    inputBackground: '#282c37',
    // Borders
    borderColor: '#393f4f',
    // Primary button
    buttonBackground: '#1677ff',
    buttonBackgroundHover: '#4096ff',
    buttonColor: '#fff',
    // Semantic colors
    successColor: '#22c55e',
    errorColor: '#ef4444',
    verifiedColor: '#22c55e',
    // Vote colors
    voteUpColor: '#22c55e',
    voteDownColor: '#ef4444',
    // Link colors
    linkColor: '#1677ff',
    linkColorHover: '#4096ff'
  },
  light: {
    // Text colors
    textColor: '#2a2e2e',
    textMuted: '#687a86',
    // Deprecated: use textMuted instead
    textColorSecondary: '#687a86',
    // Backgrounds
    inputBackground: '#f6f8f9',
    // Borders
    borderColor: '#d9d9d9',
    // Primary button
    buttonBackground: '#1677ff',
    buttonBackgroundHover: '#4096ff',
    buttonColor: '#fff',
    // Semantic colors
    successColor: '#16a34a',
    errorColor: '#dc2626',
    verifiedColor: '#16a34a',
    // Vote colors
    voteUpColor: '#16a34a',
    voteDownColor: '#dc2626',
    // Link colors
    linkColor: '#1677ff',
    linkColorHover: '#4096ff'
  }
} as const;

type Props = {
  children: React.ReactNode;
  theme: string | null;
};

export default function Theme(props: Props) {
  const themeKey = (props.theme || 'light') as keyof typeof themes;
  const theme = themes[themeKey] || themes.light;
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
