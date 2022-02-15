import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { QuizContext } from '../../contexts/QuizContext';
import Button from '../Common/Button';
import Stopwatch from '../Common/Stopwatch';
import GameStartMenu from '../GameStartMenu/GameStartMenu';
import '../Common/Game.css';
import GameEnd from '../GameEnd/GameEnd';

export default function Quiz({ game }) {
    const { region } = useParams();
    const ctx = useContext(QuizContext);
    const [question, setQuestion] = useState({});
    const [isAnswered, setIsAnswered] = useState(false);
    const [options, setOptions] = useState({ showAnswers: true, showStopwatch: true });
    const [time, setTime] = useState(0);
    const [runStopwatch, setRunStopwatch] = useState(false);

    const startGameHandler = (showAnswers, showStopwatch) => {
        setOptions({ showAnswers, showStopwatch })
        setQuestion(ctx.startGame(game, region));
        if (showStopwatch) startStopwatch();
    }

    const answerQuestionHandler = (e, country, answer) => {
        if (!isAnswered) {
            setIsAnswered(true);
            const [isCorrect, correct] = ctx.answerQuestion(country, answer);
            if (options.showAnswers) {
                if (isCorrect) {
                    e.currentTarget.classList.add('true');
                } else {
                    e.currentTarget.classList.add('false');
                    [...e.currentTarget.parentNode.children].find(x => x.textContent === correct).classList.add('true');
                }
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
        [...e.currentTarget.parentNode.parentNode.children].forEach(btn => (btn.classList.contains('true') || btn.classList.contains('false')) ? btn.classList.remove('true') & btn.classList.remove('false') : null);
        setQuestion(ctx.nextQuestion(country));
        if (options.showStopwatch && ctx.questionsLeft > 0) startStopwatch();
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
                <section className="game quiz">
                    {ctx.questionsLeft === 0 ?
                        (   //End of game screen
                            <GameEnd title={`${region[0].toLocaleUpperCase().concat(region.slice(1)).replace('-o', ' & O')} Capitals Quiz`}
                                score={{ value: ctx.score, max: ctx.capitals.length }} time={{ value: time, on: options.showStopwatch }} />
                        )
                        :
                        (   //Game
                            <>
                                <header className="header">
                                    <Stopwatch run={runStopwatch} on={options.showStopwatch} time={time} setTime={setTime} width={game !== 'flags' ? '25%' : '49%'} />
                                    {game !== 'flags' ?
                                        <article className="title-container title">
                                            <p className='game-title'>{question.country}</p>
                                        </article> : ''}

                                    <article className="title-container score" style={{ width: game !== 'flags' ? '25%' : '49%' }}>
                                        {ctx.capitals ? <p className='game-title'>{`${ctx.score}/${ctx.capitals.length}`}</p> : ''}
                                    </article>
                                </header>
                                <article className="game-img-container">
                                    <img src={question.image} alt={question.country} className="game-img" />
                                </article>
                                <div className={`btn-container ${isAnswered ? 'answered' : ''}`}>
                                    {question.answers.map(answer => <Button onClick={(e) => answerQuestionHandler(e, question.country, answer)} key={answer}>{answer}</Button>)}
                                    {(isAnswered && options.showAnswers) ?
                                        <article className="next-modal">
                                            <Button className='next-btn' onClick={(e) => nextQuestionHandler(e, question.country)}>{ctx.questionsLeft > 0 ? 'Next' : 'End'}</Button>
                                        </article> : ''}
                                </div>
                            </>
                        )
                    }
                </section >
            )
            : <GameStartMenu content={{ title: `${region[0].toLocaleUpperCase().concat(region.slice(1)).replace('-o', ' & O')} ${game[0].toLocaleUpperCase().concat(game.slice(1))} Quiz`, image: `/images/${region}/flags.png` }} startGame={startGameHandler} region={region} />
    )
}