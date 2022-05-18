import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Aside.css';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple'];

export default function Aside() {
    const [showAside, setShowAside] = useState(true);
    const [githubHover, setGithubHover] = useState(false);
    const [stateInterval, setStateInterval] = useState(null);
    const [githubColorIndex, setGithubColorIndex] = useState(-1);

    const content = useRef(null);
    const aside = useRef(null);

    useEffect(() => {
        const closeAsideHandler = (e) => {
            if (
                aside.current
                && showAside
                && !aside.current.contains(e.target)
            ) {
                asideHandler();
            }
        }

        window.addEventListener('click', closeAsideHandler)

        return () => window.removeEventListener('click', closeAsideHandler);
    }, [showAside])


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

    const mouseOverGithubHandler = () => {
        setGithubHover(true);

        if (githubColorIndex === -1)
            setGithubColorIndex(0);

        setStateInterval(setInterval(() => {
            setGithubColorIndex(i => i >= colors.length - 1 ? 0 : i + 1)
        }, 950))
    }

    const mouseOutGithubHandler = () => {
        setGithubHover(false);

        setStateInterval(interval => {
            clearInterval(interval);
            return null;
        })
    }

    return (
        <aside ref={aside}>
            {showAside &&
                <div className='aside-content' ref={content}>
                    <ul className={`aside-links-list ${colors[githubColorIndex]}`}>
                        <li className='aside-link aside-link-singleplayer'>
                            <span>&#127758;</span>
                            <Link to="/">Singleplayer</Link>
                        </li>
                        <li className='aside-link aside-link-multiplayer'>
                            <span>&#128279;</span>
                            <Link to="/multiplayer">Multiplayer</Link>
                        </li>
                    </ul>
                    <a href='https://github.com/denizdsh' target='_blank' rel="noreferrer">
                        <FontAwesomeIcon onMouseOverCapture={mouseOverGithubHandler}
                            onMouseOutCapture={mouseOutGithubHandler}
                            shake={githubHover}
                            size="3x"
                            className={`github ${colors[githubColorIndex]}`}
                            icon="fa-brands fa-github" />
                    </a>
                </div>
            }

            <article className={`show-aside-container${showAside ? ' show-aside-container-close' : ''}`}>
                <button className={`show-aside${showAside ? ' show-aside-close' : ''}`} onClick={asideHandler}>
                    <svg width="10px" height="20px" className='arrow arrow-1'>
                        <path d='M 0 20 L 0 20 L 10 10 L 0 0' />
                    </svg>
                    <svg width="10px" height="20px" className='arrow arrow-2'>
                        <path d='M 0 20 L 0 20 L 10 10 L 0 0' />
                    </svg>
                </button>
            </article>
        </aside >
    )
}