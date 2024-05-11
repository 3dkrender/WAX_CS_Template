import { en_US, es_ES } from '../i18n';

import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import store from '../redux/store';

let defaultLang = 'en_US';

i18n
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false },
    lng: defaultLang,
    resources: {
      en: {
        translation: en_US
      },
      es: {
        translation: es_ES
      }
    }
  });

store.subscribe(() => {
  if (store.getState().config.lang !== defaultLang) {
    defaultLang = store.getState().config.lang;
    i18n.changeLanguage(defaultLang);
  }
});