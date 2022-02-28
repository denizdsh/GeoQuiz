import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { NavContext } from '../../contexts/NavContext';
import { SoundContext } from '../../contexts/SoundContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';
import Switch from '../Common/Switch';

export default function Header({ theme, switchThemeHandler }) {
    const navigate = useNavigate();
    const { language, switchLanguageHandler } = useContext(LanguageContext);
    const { displayNav, displayLogo } = useContext(NavContext);
    const { isSoundOn, switchIsSoundOn } = useContext(SoundContext);

    return (
        <nav className="nav" style={displayNav ? {} : { display: 'none' }}>
            <article className={`nav-logo${displayLogo ? '' : ' hide'}`} onClick={() => navigate('/')}>
                <img src="/logos/logo.svg" alt="GeoQuiz" className='nav-logo-planet nav-logo-image' />
                <img src="/logos/logo.png" alt="GeoQuiz" className='nav-logo-text nav-logo-image' />
            </article>
            <article className="env-options">

                <Switch isChecked={language === 'bg'} onSwitch={switchLanguageHandler}>
                    <img src="/icons/bulgaria_icon_language.png" alt="🇧🇬" className='language-icon' />
                    <img src="/icons/uk_icon_language.png" alt="🇬🇧" className='language-icon' />
                </Switch>
                <Switch isChecked={theme === 'dark'} onSwitch={switchThemeHandler}>
                    <span>🌚</span>
                    <span>🌞</span>
                </Switch>
                <Switch isChecked={isSoundOn} onSwitch={switchIsSoundOn}>
                    <FontAwesomeIcon icon="fa-solid fa-volume-high" className='sounds-on' />
                    <FontAwesomeIcon icon="fa-solid fa-volume-xmark" className='sounds-off' />
                </Switch>
            </article>
        </nav>
    )
}