import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  uz: {
    translation: {
      about: "Haqida",
      myBooks: "Mening Kitoblarim",
      plans: "Rejalar",
      dashboard: "Boshqarish",
      login: "Kirish",
    },
  },
  ru: {
    translation: {
      about: "О нас",
      myBooks: "Мои книги",
      plans: "Планы",
      dashboard: "Панель",
      login: "Войти",
    },
  },
  en: {
    translation: {
      about: "About",
      myBooks: "My Books",
      plans: "Plans",
      dashboard: "Dashboard",
      login: "Login",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "uz",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
