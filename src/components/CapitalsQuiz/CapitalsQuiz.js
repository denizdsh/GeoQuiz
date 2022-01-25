import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CapitalsQuizContext } from '../../contexts/CapitalsQuizContext';
import Button from '../Common/Button';
import Stopwatch from '../Common/Stopwatch';
import GameStartMenu from '../GameStartMenu/GameStartMenu';
import './CapitalsQuiz.css';

export default function CapitalsQuiz() {
    const { region } = useParams();
    const ctx = useContext(CapitalsQuizContext);
    const [question, setQuestion] = useState({});
    const [isAnswered, setIsAnswered] = useState(false);
    const [options, setOptions] = useState({ showAnswers: true, showStopwatch: true });
    const [runStopwatch, setRunStopwatch] = useState(false);

    const startGameHandler = (showAnswers, showStopwatch) => {
        setOptions({ showAnswers, showStopwatch })
        setQuestion(ctx.startGame(region));
        if (showStopwatch) startStopwatch();
    }

    const answerQuestionHandler = (e, country, answer) => {
        if (!isAnswered) {
            setIsAnswered(true);
            const isCorrect = ctx.answerQuestion(country, answer);
            if (isCorrect) {
                e.currentTarget.classList.add('true');
            } else {
                e.currentTarget.classList.add('false');
            }
            console.log(isCorrect);
            if (!options.showAnswers) {
                setIsAnswered(false);
                setQuestion(ctx.nextQuestion(country));
            } else if (options.showStopwatch) {
                stopStopwatch();
            }
        }
    }

    const nextQuestionHandler = (e, country) => {
        setIsAnswered(false);
        [...e.currentTarget.parentNode.children].forEach(btn => (btn.classList.contains('true') || btn.classList.contains('false')) ? btn.classList.remove('true') & btn.classList.remove('false') : null);
        setQuestion(ctx.nextQuestion(country));
        if (options.showStopwatch) startStopwatch();
    }

    const startStopwatch = () => {
        setRunStopwatch(true);
    }

    const stopStopwatch = () => {
        setRunStopwatch(false);
    }

    return (
        ctx.capitals.length !== 0
            ? (
                <section className="game-menu">
                    <article className="title-container">
                        {ctx.capitals ? <p className='game-menu-title'>{`${ctx.score}/${ctx.capitals.length}`}</p> : ''}
                        {options.showStopwatch ? <Stopwatch run={runStopwatch} /> : ''}
                    </article>
                    <article className="title-container">
                        <p className='game-menu-title'>{question.country}</p>
                    </article>
                    <div className={`btn-container ${isAnswered ? 'answered' : ''}`}>
                        {question.answers.map(answer => <Button onClick={(e) => answerQuestionHandler(e, question.country, answer)} key={answer}>{answer}</Button>)}
                        {(isAnswered && options.showAnswers) ? <Button className='next-btn' onClick={(e) => nextQuestionHandler(e, question.country)}>Next</Button> : ''}
                    </div>
                </section >)
            : <GameStartMenu content={{ title: `${region[0].toLocaleUpperCase().concat(region.slice(1))} Capitals Quiz`, image: `/images/${region}/flags.png` }} startGame={startGameHandler} region={region} />
    )
}