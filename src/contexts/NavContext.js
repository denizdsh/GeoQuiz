import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const NavContext = createContext();

export function NavProvider({ children }) {
    const [displayNav, setDisplayNav] = useState(true);
    const location = useLocation();

    useEffect(() => {
        if (!location.pathname.includes('/countries')) {
            setDisplayNav(true);
        }
    }, [location])

    const enableNav = () => {
        setDisplayNav(true);
    }

    const disableNav = () => {
        setDisplayNav(false);
    }

    return (
        <NavContext.Provider value={{ displayNav, enableNav, disableNav }}>
            {children}
        </NavContext.Provider>
    )
}