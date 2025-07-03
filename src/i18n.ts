// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import uz from "./locales/uz/uz.json";
import ru from "./locales/ru/ru.json";
import en from "./locales/en/en.json";


const resources = {
  uz: { translation: uz },
  ru: { translation: ru },
  en: { translation: en },
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'uz', 
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
      },
      react: {
        useSuspense: false, 
      },
    });
}

export default i18n;
