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
                <Planet />
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

const Planet = () => <svg className='nav-logo-planet nav-logo-image'
    viewBox="0 0 111 111">
    <g transform="translate(0,111) scale(0.1,-0.1)">
        <path d="M279 1017 c-59 -34 -134 -106 -176 -168 -26 -37 -29 -47 -17 -55 8
-5 17 -33 21 -64 7 -66 18 -83 43 -70 26 14 30 13 30 -9 0 -11 6 -26 14 -33 8
-7 33 -30 55 -50 22 -21 47 -38 55 -38 19 0 20 -13 4 -57 -11 -30 -10 -35 17
-63 25 -26 31 -43 38 -103 17 -162 17 -160 58 -207 l39 -45 -2 63 c-2 54 0 66
18 80 11 9 29 31 39 47 10 17 41 56 68 87 48 55 49 59 37 88 -7 16 -19 30 -26
30 -8 0 -32 19 -55 42 -59 61 -115 80 -185 63 -30 -7 -33 -5 -55 41 -17 34
-30 49 -44 49 -14 0 -21 8 -23 27 -5 39 38 66 80 50 27 -10 37 -7 101 27 40
21 76 47 82 59 6 14 19 22 35 22 39 0 64 22 56 48 -13 40 -43 47 -97 22 -49
-23 -79 -22 -79 4 0 26 63 56 118 56 56 0 75 15 46 37 -13 10 -35 13 -68 10
-40 -4 -49 -1 -53 14 -4 14 -17 18 -65 21 -51 3 -67 -1 -109 -25z"/>
        <path d="M917 913 c-29 -14 -33 -32 -17 -63 8 -15 6 -20 -10 -25 -11 -3 -24
-3 -30 0 -5 3 -10 1 -10 -6 0 -6 -16 -29 -35 -50 -52 -58 -47 -73 14 -43 21
11 43 14 64 9 18 -3 43 -6 57 -6 14 -1 30 -4 35 -9 6 -5 27 -11 48 -15 28 -6
37 -4 37 6 0 25 -57 134 -92 175 -33 40 -35 41 -61 27z"/>
        <path d="M818 878 c-7 -19 2 -38 19 -38 9 0 13 8 11 22 -3 25 -23 35 -30 16z" />
        <path d="M759 670 c-30 -16 -38 -26 -41 -57 -6 -49 8 -99 34 -125 16 -16 29
-19 63 -16 24 3 48 2 55 -2 15 -9 32 -72 35 -130 3 -47 22 -101 46 -133 13
-16 18 -12 56 45 52 79 82 167 90 269 7 95 2 104 -75 119 -31 7 -72 20 -90 31
-44 25 -125 25 -173 -1z"/>
    </g>
    <animateTransform attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="360 0 0"
        to="0 0 0"
        dur="25s"
        repeatCount="indefinite" />
</svg>