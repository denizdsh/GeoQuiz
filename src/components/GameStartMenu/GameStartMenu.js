import { useState, useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Common/Button';
import Switch from '../Common/Switch';
import '../Common/Game.css';
import './GameStartMenu.css';

export default function GameStartMenu({ content, startGame, game }) {
    const [showAnswers, setShowAnswers] = useState(true);
    const [showStopwatch, setShowStopwatch] = useState(true);
    const { translate } = useContext(LanguageContext);

    const gameIsQuiz = game === 'capitals' || game === 'flags';
    return (
        <section className="game game-start">
            <article className="title-container">
                <p className='game-title'>{content.title}</p>
            </article>
            <article className="game-img-container">
                <img src={content.image} className='game-img' alt={content.title} />
            </article>
            <article className="game-options">
                {gameIsQuiz ?
                    <article className="option-container">
                        <label htmlFor="answers-option" data-title={translate('Turn off to enter speedrun mode', 'misc')}>
                            <FontAwesomeIcon icon="fa-solid fa-circle-check" className={`fas ${showAnswers ? "active green" : "inactive"}`} />
                        </label>
                        <Switch name={"answers-option"} isChecked={showAnswers} onSwitch={() => setShowAnswers(!showAnswers)} />
                    </article> : null}

                <article className="option-container" style={gameIsQuiz ? {} : { margin: 'auto' }}>
                    <label htmlFor="stopwatch-option" data-title={translate('Show stopwatch', 'misc')}>
                        <FontAwesomeIcon icon="fa-solid fa-stopwatch" className={`fas ${showStopwatch ? "active stopwatch" : "inactive"}`} />
                    </label>
                    <Switch name={"stopwatch-option"} isChecked={showStopwatch} onSwitch={() => setShowStopwatch(!showStopwatch)} />
                </article>
            </article>
            <Button onClick={() => startGame({ showAnswers, showStopwatch })}>{translate('Start game', 'misc')}</Button>
        </section >
    )
}