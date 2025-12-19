import React from 'react';
import { ThemeProvider } from 'styled-components';

const themes = {
  black: {
    textColorSecondary: '#afb0b1',
    buttonBackground: '#1677ff',
    buttonBackgroundHover: '#4096ff',
    inputBackground: '#000',
    borderColor: '#2d2d2d',
    buttonColor: '#fff',
    textColor: '#fff'
  },
  dark: {
    textColorSecondary: '#606984',
    buttonBackground: '#1677ff',
    buttonBackgroundHover: '#4096ff',
    inputBackground: '#282c37',
    borderColor: '#393f4f',
    buttonColor: '#fff',
    textColor: '#fff'
  },
  light: {
    textColorSecondary: '#687a86',
    buttonBackground: '#1677ff',
    buttonBackgroundHover: '#4096ff',
    inputBackground: '#f6f8f9',
    borderColor: '#d9d9d9',
    buttonColor: '#fff',
    textColor: '#2a2e2e'
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
