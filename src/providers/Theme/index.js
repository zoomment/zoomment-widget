import React from 'react';
import { ThemeProvider } from 'styled-components';

const themes = {
  black: {
    textColorSecondary: '#afb0b1',
    buttonBackground: '#56a7e1',
    buttonBackgroundHover: '#3c8cc6',
    inputBackground: '#000',
    borderColor: '#2d2d2d',
    buttonColor: '#fff',
    textColor: '#fff'
  },
  dark: {
    textColorSecondary: '#606984',
    buttonBackground: '#56a7e1',
    buttonBackgroundHover: '#3c8cc6',
    inputBackground: '#282c37',
    borderColor: '#393f4f',
    buttonColor: '#fff',
    textColor: '#fff'
  },
  light: {
    textColorSecondary: '#687a86',
    buttonBackground: '#56a7e1',
    buttonBackgroundHover: '#3c8cc6',
    inputBackground: '#f6f8f9',
    borderColor: '#dbdfe4',
    buttonColor: '#fff',
    textColor: '#2a2e2e'
  }
};

export default function Theme(props) {
  const theme = themes[props.theme] || themes.light;
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
