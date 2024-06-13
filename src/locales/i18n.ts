import { initReactI18next } from 'react-i18next';

import i18next from 'i18next';
import translationEnglish from 'src/locales/en/index.json';

const resources = {
  en: {
    translation: translationEnglish,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: 'en',
});

export default i18next;
