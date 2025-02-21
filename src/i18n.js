import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// Get the base URL from Vite's environment
const basePath = import.meta.env.BASE_URL || "/";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "hu"],
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: basePath + "locales/{{lng}}/translation.json",
      addPath: basePath + "locales/{{lng}}/{{ns}}.missing.json",
    },
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      lookupQuerystring: "lng",
      caches: ["localStorage"],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
