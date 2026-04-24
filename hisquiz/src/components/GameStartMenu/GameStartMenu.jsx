import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

import Button from '../Common/Button';
import '../Common/Game.css';
import GameOptions from '../GameOptions/GameOptions';
import './GameStartMenu.css';

export default function GameStartMenu({ content, startGame }) {
    const [showAnswers, setShowAnswers] = useState(true);
    const [showStopwatch, setShowStopwatch] = useState(true);
    const { dict } = useTranslation();

    const switchShowAnswersHandler = () => {
        setShowAnswers(!showAnswers)
    }
    const switchShowStopwatchHandler = () => {
        setShowStopwatch(!showStopwatch)
    }
    return (
        <section className="game game-start slide absolute">
            <article className="title-container">
                <p className='game-title'>{content.title}</p>
            </article>
            <article className="game-img-container">
                <img draggable="false" src={content.image} className='game-img' alt={content.title} />
            </article>
            <GameOptions options={{ showAnswers, showStopwatch }} handlers={{ switchShowAnswersHandler, switchShowStopwatchHandler }} />

            <Button onClick={() => startGame({ showAnswers, showStopwatch })}>{dict.misc.StartGame}</Button>
        </section >
    )
}