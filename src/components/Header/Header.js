import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header({ theme, switchThemeHandler }) {
    return (
        <>
            <nav className="nav">
                <article className="nav-logo">
                    <img src="/logos/logo.svg" alt="GeoQuiz" className='nav-logo-planet nav-logo-image' />
                    <img src="/logos/logo.png" alt="GeoQuiz" className='nav-logo-text nav-logo-image' />
                </article>
                <article className="switch-theme">
                    <label class="switch">
                        <input type="checkbox" checked={theme === 'dark'} onChange={switchThemeHandler} />
                        <span class="slider round">
                        </span>
                    </label>
                </article>
            </nav>
        </>
    )
}