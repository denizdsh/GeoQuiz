import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { NavContext } from '../../contexts/NavContext';

import './Header.css';
import Switch from '../Common/Switch';

export default function Header({ theme, switchThemeHandler }) {
    const navigate = useNavigate();
    const { language, switchLanguageHandler } = useContext(LanguageContext);
    const { displayNav } = useContext(NavContext);

    return (
        <nav className="nav" style={displayNav ? {} : { display: 'none' }}>
            <article className="nav-logo" onClick={() => navigate('/')}>
                <img src="/logos/logo.svg" alt="GeoQuiz" className='nav-logo-planet nav-logo-image' />
                <img src="/logos/logo.png" alt="GeoQuiz" className='nav-logo-text nav-logo-image' />
            </article>
            <article className="switch-theme">
                <Switch isChecked={language === 'bg'} onSwitch={switchLanguageHandler}>
                    <span>🇧🇬</span>
                    <span>🇬🇧</span>
                </Switch>
                <Switch isChecked={theme === 'dark'} onSwitch={switchThemeHandler}>
                    <span>🌚</span>
                    <span>🌞</span>
                </Switch>
            </article>
        </nav>
    )
}