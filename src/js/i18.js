import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";

import translationRU from '../locales/ru/translation.json';
import translationEN from '../locales/en/translation.json';
import translationES from '../locales/es/translation.json';

const resources = {
    ru: {
        translation: translationRU
    },
    en: {
        translation: translationEN
    },
    es: {
        translation: translationES
    }
};

if (window.location.hostname === "localhost") {
    i18n
        .use(Backend)
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources,
            fallbackLng: "ru",
            debug: true,
            detection: {
                order: ["queryString", "cookie"],
                cache: ["cookie"]
            },
            interpolation: {
                escapeValue: false
            }
        })
}

else {
    i18n
        .use(Backend)
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            fallbackLng: "ru",
            debug: true,
            detection: {
                order: ["queryString", "cookie"],
                cache: ["cookie"]
            },
            interpolation: {
                escapeValue: false
            }
        })
}

export default i18n
