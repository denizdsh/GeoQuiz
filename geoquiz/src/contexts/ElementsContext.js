import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const ElementsContext = createContext();

export function ElementsProvider({ children }) {
    const location = useLocation();

    const [displayNav, setDisplayNav] = useState(true);
    const [displayLogo, setDisplayLogo] = useState(true); //disable logo in-game on phones or ports with less than 800px 

    const [displayBackBtn, setDisplayBackBtn] = useState(true);
    const [displayAside, setDisplayAside] = useState(true);

    useEffect(() => {
        if (location.pathname === '/') {
            disableBackBtn();
        } else if (!displayBackBtn) {
            enableBackBtn();
        }
        if (!location.pathname.includes('/countries')) {
            enableNav();
        }
        if (!location.pathname.includes('/capitals') || !location.pathname.includes('/flags')) {
            disableLogo();
        }
    }, [location])

    const enable = (setFn) => {
        setFn(true);
    }

    const disable = (setFn) => {
        setFn(false);
    }

    const enableNav = () => {
        enable(setDisplayNav);
    }

    const disableNav = () => {
        disable(setDisplayNav);
    }

    const enableLogo = () => {
        enable(setDisplayLogo);
    }

    const disableLogo = () => {
        disable(setDisplayLogo);
    }

    const enableBackBtn = () => {
        enable(setDisplayBackBtn);
    }

    const disableBackBtn = () => {
        disable(setDisplayBackBtn);
    }

    const enableAside = () => {
        enable(setDisplayAside);
    }

    const disableAside = () => {
        disable(setDisplayAside);
    }

    return (
        <ElementsContext.Provider value={{
            displayNav, enableNav, disableNav,
            displayLogo, enableLogo, disableLogo,
            displayBackBtn, enableBackBtn, disableBackBtn,
            displayAside, enableAside, disableAside
        }}>
            {children}
        </ElementsContext.Provider>
    )
}