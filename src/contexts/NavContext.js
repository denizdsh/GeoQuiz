import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const NavContext = createContext();

export function NavProvider({ children }) {
    const [displayNav, setDisplayNav] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setDisplayNav(!location.pathname.includes('/countries'))
    }, [location])

    const enableNav = () => {
        setDisplayNav(true);
    }
    
    return (
        <NavContext.Provider value={{ displayNav, enableNav }}>
            {children}
        </NavContext.Provider>
    )
}