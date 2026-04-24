import { createContext, useCallback } from "react";
import useLocalStorage from "use-local-storage";

import translationBG from '../assets/translations/bg.json';
import translationEN from '../assets/translations/en.json';

import { Language } from "../enums/lang/Language";
import { TranslationType } from "../enums/lang/TranslationType";

/**
    * @type React.Context<{
    * language: keyof typeof translations
    * dict: typeof translationEN
    * translate: (word: any, type: keyof typeof types) => any
    * switchLanguageHandler: () => void
    * }>
*/
export const LanguageContext = createContext({});

const types = Object.values(TranslationType);

const translations = {
    [Language.EN]: translationEN,
    [Language.BG]: translationBG,
    [Language.DEFAULT]: translationEN,
}

export function LanguageProvider({ children }) {
    /**
     * Gives translations[language] object a known structure in code 
     * @type [keyof typeof translations, Setter<string>]
     */
    const [language, setLanguage] = useLocalStorage('language', Object.values(Language).includes(window.navigator.language)
        ? window.navigator.language
        : Language.DEFAULT);

    const translate = useCallback((
        word,
        /**
        * @type keyof typeof types
        */
        type) => {
        try {
            if (!type | !types.includes(type)) {
                const err = new Error(`Invalid translation type: ${type}.\nValid types:\n${types.join(',\n')}`);

                const translated = Object.values(translations[language]).map(x => Object.entries(x)).flat().find(x => x[0] === word)[1];

                err.word = translated;
                throw err;
            }

            return translations[language][type][word] || word;
        } catch (e) {
            console.error(e)
            return e.word || word;
        }
    }, [language])

    const switchLanguageHandler = () => {
        setLanguage(lang => lang === Language.EN ? Language.BG : Language.EN);
    }

    return (
        <LanguageContext.Provider value={{ language, dict: translations[language], switchLanguageHandler, translate }}>
            {children}
        </LanguageContext.Provider>
    )
}