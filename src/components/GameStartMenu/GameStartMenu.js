import { useState } from 'react';
import './GameStartMenu.css';
import Button from '../Common/Button';
import Switch from '../Common/Switch';

export default function GameStartMenu({ content, startGame, region }) {
    const [showAnswers, setShowAnswers] = useState(false);
    const [showStopwatch, setShowStopwatch] = useState(true);

    return (
        <section className="game-menu">
            <article className="title-container">
                <p className='game-menu-title'>{content.title}</p>
            </article>
            <article className="game-menu-img-container">
                <img src={content.image} className='game-menu-img' alt={content.title} />
            </article>
            <article className="game-menu-options">
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
            <Button onClick={() => startGame(region)}>Start game</Button>
        </section>
    )
}