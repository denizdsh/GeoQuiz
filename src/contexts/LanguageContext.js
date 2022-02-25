import { createContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "use-local-storage";
export const LanguageContext = createContext();

const defaultBulgarian = window.navigator.language == 'bg';
export function LanguageProvider({ children }) {
    const [language, setLanguage] = useLocalStorage('language', defaultBulgarian ? 'bg' : 'en');
    const [translation, setTranslation] = useState({});

    useEffect(() => {
        if (language !== 'en') {
            (async () => {
                setTranslation(require(`../translations/${language}.json`));
                //(await (await fetch(`http://localhost:3000/translations/${language}.json`)).json());
            })()
        }
    }, [language])

    const translate = useCallback((type, word) => {
        if (language === 'en' || Object.keys(translation).length === 0) return word;
        return translation[type][word];
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