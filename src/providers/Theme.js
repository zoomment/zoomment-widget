import React from "react";
import { ThemeProvider } from "styled-components";

const themes = {
  dark: {
    textColorSecondary: "#b7b7b7",
    componentBackground: "#fff",
    buttonBackground: "#dcdcdc",
    inputBackground: "#fff",
    borderColor: "#e7e9ee",
    buttonColor: "#444",
    textColor: "#fff",
  },
  light: {
    textColorSecondary: "#687a86",
    componentBackground: "#fff",
    buttonBackground: "#778289",
    inputBackground: "#f6f8f9",
    buttonColor: "#fff",
    borderColor: "#dbdfe4",
    textColor: "#2a2e2e",
  },
};

export default function Theme(props) {
  const theme = themes[props.theme] || themes.light;
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
