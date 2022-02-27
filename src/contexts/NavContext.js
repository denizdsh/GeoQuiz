import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const NavContext = createContext();

export function NavProvider({ children }) {
    const [displayNav, setDisplayNav] = useState(true);
    const [displayLogo, setDisplayLogo] = useState(true); //disable logo in-game on phones or ports with less than 800px 
    const location = useLocation();

    useEffect(() => {
        if (!location.pathname.includes('/countries')) {
            setDisplayNav(true);
        }
        if (!location.pathname.includes('/capitals') || !location.pathname.includes('/flags')) {
            setDisplayLogo(true);
        }
    }, [location])

    const enableNav = () => {
        setDisplayNav(true);
    }

    const disableNav = () => {
        setDisplayNav(false);
    }

    const enableLogo = () => {
        setDisplayLogo(true);
    }

    const disableLogo = () => {
        setDisplayLogo(false);
    }

    return (
        <NavContext.Provider value={{ displayNav, enableNav, disableNav, displayLogo, enableLogo, disableLogo }}>
            {children}
        </NavContext.Provider>
    )
}