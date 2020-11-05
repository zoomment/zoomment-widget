import React from 'react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import hy from '../locales/hy.json';
import hyw from '../locales/hyw.json';

const resources = {
  en: { translation: en },
  hy: { translation: hy },
  hyw: { translation: hyw }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
});

export default function LanguageProvider(props) {
  i18n.changeLanguage(props.language);
  return <I18nextProvider i18n={i18n}>{props.children}</I18nextProvider>;
}
