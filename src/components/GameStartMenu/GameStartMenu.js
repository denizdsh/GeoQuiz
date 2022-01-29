import { useState } from 'react';

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
                        <i className="fab fa-earlybirds" style={{ color: showAnswers ? "var(--green)" : "var(--text-secondary)" }} />
                    </label>
                    <Switch name={"answers-option"} isChecked={showAnswers} onSwitch={() => setShowAnswers(!showAnswers)} />
                </article>
                <article className="option-container">
                    <label htmlFor="stopwatch-option" data-title="Show stopwatch">
                        <i className="fas fa-stopwatch" style={{ color: showStopwatch ? "var(--stopwatch)" : "var(--text-secondary)" }} />
                    </label>
                    <Switch name={"stopwatch-option"} isChecked={showStopwatch} onSwitch={() => setShowStopwatch(!showStopwatch)} />
                </article>
            </article>
            <Button onClick={() => startGame(showAnswers, showStopwatch)}>Start game</Button>
        </section>
    )
}