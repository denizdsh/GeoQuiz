import { useState, useContext, } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

import Button from '../Common/Button';
import '../Common/Game.css';
import GameOptions from '../GameOptions/GameOptions';
import './GameStartMenu.css';

export default function GameStartMenu({ content, startGame, game }) {
    const [showAnswers, setShowAnswers] = useState(true);
    const [showStopwatch, setShowStopwatch] = useState(true);
    const { translate } = useContext(LanguageContext);

    const switchShowAnswersHandler = () => {
        setShowAnswers(!showAnswers)
    }
    const switchShowStopwatchHandler = () => {
        setShowStopwatch(!showStopwatch)
    }

    const gameIsQuiz = game === 'capitals' || game === 'flags';
    return (
        <section className="game game-start slide absolute">
            <article className="title-container">
                <p className='game-title'>{content.title}</p>
            </article>
            <article className="game-img-container">
                <img draggable="false" src={content.image} className='game-img' alt={content.title} />
            </article>
            <GameOptions renderAnswersIf={gameIsQuiz} options={{ showAnswers, showStopwatch }} handlers={{ switchShowAnswersHandler, switchShowStopwatchHandler }} />

            <Button onClick={() => startGame({ showAnswers, showStopwatch })}>{translate('Start game', 'misc')}</Button>
        </section >
    )
}