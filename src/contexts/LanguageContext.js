import { createContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "use-local-storage";
export const LanguageContext = createContext({});

const types = ['game', 'region', 'misc', 'country', 'capital'];

const defaultBulgarian = window.navigator.language === 'bg';

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useLocalStorage('language', defaultBulgarian ? 'bg' : 'en');
    const [translation, setTranslation] = useState({});

    useEffect(() => {
        if (language !== 'en') {
            (async () => {
                try {
                    const res = await fetch(`${process.env.NODE_ENV === 'production' ? process.env.REACT_APP_URL : 'http://localhost:3000'}/translations/${language}.json`);
                    const data = await res.json();
                    setTranslation(data);
                } catch (e) {
                    console.log(e);
                }
            })()
        }
    }, [language])

    const translate = useCallback((word, type) => {
        if (language === 'en' || Object.keys(translation).length === 0) return word;
        try {
            if (!types.includes(type) || !type) {
                const err = new Error(`Invalid translation type: ${type}.\nValid types:\n${types.join(',\n')}`);

                const word = Object.values(translation).map(x => Object.entries(x)).flat().find(x => x[0] === word)[1];

                err.word = word;
                throw err;
            }

            return translation[type][word];
        } catch (e) {
            console.error(e);
            return e.word || word;
        }
    }, [language, translation])

    const switchLanguageHandler = () => {
        setLanguage(language === 'en' ? 'bg' : 'en');
    }

    return (
        <LanguageContext.Provider value={{ language, switchLanguageHandler, translate }}>
            {children}
        </LanguageContext.Provider>
    )
}