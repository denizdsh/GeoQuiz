import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { ElementsContext } from '../../contexts/ElementsContext';
import { SoundContext } from '../../contexts/SoundContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';
import Switch from '../Common/Switch';
import PlanetSVG from '../Common/PlanetSVG';

export default function Header({ theme, switchThemeHandler }) {
    const navigate = useNavigate();
    const { language, switchLanguageHandler } = useContext(LanguageContext);
    const { displayNav, displayLogo } = useContext(ElementsContext);
    const { isSoundOn, switchIsSoundOn } = useContext(SoundContext);

    return (
        <nav className="nav" style={displayNav ? {} : { display: 'none' }}>
            <article className={`nav-logo${displayLogo ? '' : ' hide'}`} onClick={() => navigate('/')}>
                <PlanetSVG className='nav-logo-planet nav-logo-image' />
                <img draggable="false" className='nav-logo-text nav-logo-image'
                    src="/logos/logo.png" alt="GeoQuiz" />
            </article>
            <article className="env-options">

                <Switch isChecked={language === 'bg'} onSwitch={switchLanguageHandler}>
                    <img draggable="false" className='language-icon'
                        src="/icons/bulgaria_icon_language.png" alt="🇧🇬"
                        title='Bulgarian language' />
                    <img draggable="false" className='language-icon'
                        src="/icons/uk_icon_language.png" alt="🇬🇧"
                        title='English language' />
                </Switch>
                <Switch isChecked={theme === 'dark'} onSwitch={switchThemeHandler}>
                    <span title='Dark theme'>🌚</span>
                    <span title='Light theme'>🌞</span>
                </Switch>
                <Switch isChecked={isSoundOn} onSwitch={switchIsSoundOn}>
                    <FontAwesomeIcon title='Sound effects ON' icon="fa-solid fa-volume-high" className='sounds-on' />
                    <FontAwesomeIcon title='Sound effects OFF' icon="fa-solid fa-volume-xmark" className='sounds-off' />
                </Switch>
            </article>
        </nav>
    )
}