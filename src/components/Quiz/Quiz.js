import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { QuizContext } from '../../contexts/QuizContext';
import { LanguageContext } from '../../contexts/LanguageContext';
import { NavContext } from '../../contexts/NavContext';
import { SoundContext } from '../../contexts/SoundContext';

import Button from '../Common/Button';
import Stopwatch from '../Common/Stopwatch';
import GameStartMenu from '../GameStartMenu/GameStartMenu';
import '../Common/Game.css';
import GameEnd from '../GameEnd/GameEnd';

export default function Quiz({ game }) {
    const { region } = useParams();
    const ctx = useContext(QuizContext);
    const { translate } = useContext(LanguageContext);
    const { enableLogo, disableLogo } = useContext(NavContext);
    const { sounds } = useContext(SoundContext);
    const [question, setQuestion] = useState();
    const [isAnswered, setIsAnswered] = useState(false);
    const [options, setOptions] = useState({ showAnswers: true, showStopwatch: true });
    const [time, setTime] = useState(0);
    const [runStopwatch, setRunStopwatch] = useState(false);
    const [rotate, setRotate] = useState(false);

    const startGameHandler = ({ showAnswers, showStopwatch }) => {
        setOptions({ showAnswers, showStopwatch });
        disableLogo();
        setQuestion(ctx.startGame(game, region));
        if (showStopwatch) startStopwatch();
    }

    const answerQuestionHandler = (e, country, answer) => {
        if (!isAnswered) {
            setIsAnswered(true);
            sounds.answer();
            const [isCorrect, correct] = ctx.answerQuestion(country, answer);
            if (options.showAnswers) {
                if (isCorrect) {
                    e.currentTarget.classList.add('true');
                } else {
                    e.currentTarget.classList.add('false');
                    [...e.currentTarget.parentNode.children]
                        .find(x => x.textContent === translate(correct, game === 'capitals' ? 'capital' : 'country'))
                        .classList.add('true');

                    setRotate(true);
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
        [...e.currentTarget.parentNode.parentNode.children].forEach(btn =>
            (btn.classList.contains('true') || btn.classList.contains('false'))
                ? btn.classList.remove('true') & btn.classList.remove('false')
                : null);
        setQuestion(ctx.nextQuestion(country));
        if (options.showAnswers && rotate) setRotate(false);
        if (options.showStopwatch && ctx.questionsLeft > 0) startStopwatch();
    }

    const startStopwatch = () => {
        setRunStopwatch(true);
    }

    const stopStopwatch = () => {
        setRunStopwatch(false);
    }

    if (ctx.data.length === 0) enableLogo();
    const regionText = translate(region[0].toLocaleUpperCase().concat(region.slice(1)).replace('-o', ' & O'), 'region');
    const gameDescText = translate(`${game[0].toLocaleUpperCase().concat(game.slice(1))} Quiz`, 'misc');
    return (
        ctx.data.length !== 0
            ? (
                ctx.questionsLeft === 0 ?
                    (   //End of game screen
                        <GameEnd title={`${regionText}: ${gameDescText}`}
                            score={{ value: ctx.score, max: ctx.data.length }} time={{ value: time, on: options.showStopwatch }} />
                    )
                    :
                    (   //Game
                        <section className={`game quiz ${game}${rotate ? ' rotate' : ''}`}>
                            <header className="header">
                                <Stopwatch run={runStopwatch} on={options.showStopwatch} time={time} setTime={setTime} width={game !== 'flags' ? '25%' : '49%'} />
                                {game !== 'flags' ?
                                    <article className="title-container title">
                                        <p className='game-title'>{translate(question.country, 'country')}</p>
                                    </article> : ''}

                                <article className="title-container score" style={{ width: game !== 'flags' ? '25%' : '49%' }}>
                                    {ctx.data ? <p className='game-title'>{`${ctx.score}/${ctx.data.length}`}</p> : ''}
                                </article >
                            </header >
                            <article className="game-img-container">
                                {question?.image}
                            </article>
                            <div className={`btn-container ${isAnswered ? 'answered' : ''}`}>
                                {question?.answers?.map(answer => <Button onClick={(e) => answerQuestionHandler(e, question.feature, answer)} key={answer}>{translate(answer, game === 'capitals' ? 'capital' : 'country')}</Button>)}
                                {(isAnswered && options.showAnswers) ?
                                    <article className="next-modal">
                                        <Button className='next-btn' onClick={(e) => nextQuestionHandler(e, question.country)}>{translate(ctx.questionsLeft > 0 ? 'Next' : 'End', 'misc')}</Button>
                                    </article> : ''}
                            </div>
                        </section >
                    )
            )
            : <GameStartMenu content={{ title: `${regionText}: ${gameDescText}`, image: `/images/${region}/${game}.png` }}
                startGame={startGameHandler} region={region} game={game} />
    )
}