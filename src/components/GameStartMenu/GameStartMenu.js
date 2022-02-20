import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Common/Button';
import Switch from '../Common/Switch';
import '../Common/Game.css';
import './GameStartMenu.css';

export default function GameStartMenu({ content, startGame }) {
    const [showAnswers, setShowAnswers] = useState(true);
    const [showStopwatch, setShowStopwatch] = useState(true);

    return (
        <section className="game">
            <article className="title-container">
                <p className='game-title'>{content.title}</p>
            </article>
            <article className="game-img-container">
                <img src={content.image} className='game-img' alt={content.title} />
            </article>
            <article className="game-options">
                <article className="option-container">
                    <label htmlFor="answers-option" data-title="Highlight correct answers in green when answered wrong">
                        <FontAwesomeIcon icon="fa-solid fa-circle-check" className={`fas ${showAnswers ? "active green" : "inactive"}`} />
                    </label>
                    <Switch name={"answers-option"} isChecked={showAnswers} onSwitch={() => setShowAnswers(!showAnswers)} />
                </article>
                <article className="option-container">
                    <label htmlFor="stopwatch-option" data-title="Show stopwatch">
                        <FontAwesomeIcon icon="fa-solid fa-stopwatch" className={`fas ${showStopwatch ? "active stopwatch" : "inactive"}`} />
                    </label>
                    <Switch name={"stopwatch-option"} isChecked={showStopwatch} onSwitch={() => setShowStopwatch(!showStopwatch)} />
                </article>
            </article>
            <Button onClick={() => startGame(showAnswers, showStopwatch)}>Start game</Button>
        </section>
    )
}