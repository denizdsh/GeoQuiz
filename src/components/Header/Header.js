import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header({theme, switchThemeHandler}) {
    return (
        <nav className="nav">
            <article className="nav-logo">
                <img src="/logo.svg" alt="GeoQuiz" className='nav-logo-planet nav-logo-image' />
                <img src="/logo.png" alt="GeoQuiz" className='nav-logo-text nav-logo-image' />
            </article>
            <article className="switch-theme">
                <button className="switch-theme-btn" onClick={switchThemeHandler}>
                    {theme} theme
                </button>
            </article>
        </nav>
    )
}