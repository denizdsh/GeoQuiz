import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useElements } from '../../hooks/useElements';
import './Aside.css';

export default function Aside() {
    const { displayAside } = useElements();
    const { dict } = useTranslation();

    const [showAside, setShowAside] = useState(true);

    const content = useRef(null);
    const aside = useRef(null);

    const closeAsideHandler = useCallback((e) => {
        if (
            aside.current
            && showAside
            && !aside.current.contains(e.target)
        ) {
            asideHandler();
        }
    }, [showAside, aside])

    useEffect(() => {
        window.addEventListener('click', closeAsideHandler)

        return () => window.removeEventListener('click', closeAsideHandler);
    }, [closeAsideHandler])




    const asideHandler = () => {
        if (showAside) {
            if (content.current)
                content.current.classList.add('aside-content-close')

            const interval = setInterval(() => {
                setShowAside(false);
                clearInterval(interval);
            }, 400);

            return;
        }

        setShowAside(true);
    }

    return (displayAside &&
        <aside ref={aside}>
            {showAside &&
                <div className='aside-content' ref={content}>
                    <ul className={`aside-links-list`}>
                        <li className='aside-link aside-link-singleplayer'>
                            <span>&#127758;</span>
                            <Link to="/">{dict.misc.Singleplayer}</Link>
                        </li>
                        <li className='aside-link aside-link-multiplayer'>
                            <span>&#128279;</span>
                            <Link to="/multiplayer">{dict.misc.Multiplayer}</Link>
                        </li>
                    </ul>
                </div>
            }

            <article className={`show-aside-container${showAside ? ' show-aside-container-close' : ''}`}>
                <button style={{ width: 'fit-content' }} className={`show-aside${showAside ? ' show-aside-close' : ''}`} onClick={asideHandler}>
                    <svg width='0.6em' height='1.2em' viewBox='0 0 10 20' className='arrow arrow-1'>
                        <path d='M 0 20 L 0 20 L 10 10 L 0 0' />
                    </svg>
                    <svg width='0.6em' height='1.2em' viewBox='0 0 10 20' className='arrow arrow-2'>
                        <path d='M 0 20 L 0 20 L 10 10 L 0 0' />
                    </svg>
                </button>
            </article>
        </aside >
    )
}