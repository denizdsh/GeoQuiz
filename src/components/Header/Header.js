import { useNavigate } from 'react-router-dom';

import './Header.css';
import Switch from '../Common/Switch';

export default function Header({ theme, switchThemeHandler }) {
    const navigate = useNavigate();

    return (
        <>
            <nav className="nav">
                <article className="nav-logo" onClick={() => navigate('/')}>
                    <img src="/logos/logo.svg" alt="GeoQuiz" className='nav-logo-planet nav-logo-image' />
                    <img src="/logos/logo.png" alt="GeoQuiz" className='nav-logo-text nav-logo-image' />
                </article>
                <article className="switch-theme">
                    <Switch isChecked={theme === 'dark'} onSwitch={switchThemeHandler} />
                </article>
            </nav>
        </>
    )
}