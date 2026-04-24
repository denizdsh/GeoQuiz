import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useSounds } from '../../hooks/useSounds';
import { useElements } from '../../hooks/useElements';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';
import Switch from '../Common/Switch';

export default function Header({ theme, switchThemeHandler }) {
    const navigate = useNavigate();
    const { language, switchLanguageHandler } = useTranslation();
    const { displayNav, displayLogo } = useElements();
    const { isSoundOn, switchIsSoundOn } = useSounds();

    return (
        <nav className="nav" style={displayNav ? {} : { display: 'none' }}>
            <article className={`nav-logo${displayLogo ? '' : ' hide'}`} onClick={() => navigate('/')}>
                <img draggable="false" className='nav-logo-image'
                    src="/logos/logo.png" alt="HisQuiz" />
                <section className='nav-logo-text'>
                    <h1>HisQuiz</h1>
                    <h4>Discover History in a fun way!</h4>
                </section>
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