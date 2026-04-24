import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useSounds } from '../../hooks/useSounds';
import { useElements } from '../../hooks/useElements';
import { useQuiz } from '../../hooks/useQuiz';

import '../Common/Game.css';

import Button from '../Common/Button';
import Stopwatch from '../Common/Stopwatch';
import GameStartMenu from '../GameStartMenu/GameStartMenu';
import GameEnd from '../GameEnd/GameEnd';
import { getPoints } from '../../helper/calculateScore';
import { getGame } from '../../services/contentService';
import { TranslationType } from '../../enums/lang/TranslationType';
import { Game } from '../../enums/Game';

export default function Quiz({ game, multiplayerData }) {
    const age = useParams().age || multiplayerData.age;
    const ctx = useQuiz();
    const { translate, dict } = useTranslation();
    const { enableLogo, disableLogo } = useElements();
    const { sounds } = useSounds();
    const [question, setQuestion] = useState();
    const [isAnswered, setIsAnswered] = useState(false);
    const [options, setOptions] = useState({ showAnswers: true, showStopwatch: true });
    const [time, setTime] = useState(0);
    const [runStopwatch, setRunStopwatch] = useState(false);
    const [shake, setShake] = useState(false);


    useEffect(() => {
        if (!multiplayerData)
            return;

        startGameHandler(multiplayerData.options);
    }, [])

    const startGameHandler = ({ showAnswers, showStopwatch }) => {
        setOptions({ showAnswers, showStopwatch });
        disableLogo();
        setQuestion(ctx.startGame(game, age));
        if (showStopwatch) startStopwatch();
    }

    const answerQuestionHandler = (e, condition, answer) => {
        if (isAnswered)
            return;

        setIsAnswered(true);
        sounds.answer();

        const [isCorrect, correct, newScore] = ctx.answerQuestion(condition, answer);

        if (options.showAnswers) {
            if (isCorrect) {
                e.currentTarget.classList.add('true');
            } else {
                e.currentTarget.classList.add('false');
                [...e.currentTarget.parentNode.children]
                    .find(x => x.dataset.answer === correct)?.classList.add('true');

                setShake(true);
            }
        }

        console.log(isCorrect);
        if (!options.showAnswers) {
            setIsAnswered(false);
            setQuestion(ctx.nextQuestion(condition));
        } else if (options.showStopwatch) {
            stopStopwatch();
        }

        if (multiplayerData) {
            multiplayerData.updateScore(getPoints({ value: newScore, max: ctx.data.length }, { value: time }))
        }
    }

    const nextQuestionHandler = (e, condition) => {
        setIsAnswered(false);
        [...e.currentTarget.parentNode.parentNode.children].forEach(btn =>
            (btn.classList.contains('true') || btn.classList.contains('false'))
                ? btn.classList.remove('true') & btn.classList.remove('false')
                : null);
        setQuestion(ctx.nextQuestion(condition));
        if (options.showAnswers && shake) setShake(false);
        if (options.showStopwatch && ctx.questionsLeft > 0) startStopwatch();
    }

    const startStopwatch = () => {
        setRunStopwatch(true);
    }

    const stopStopwatch = () => {
        setRunStopwatch(false);
    }

    if (ctx.data.length === 0) {
        enableLogo();
    }

    const gameData = getGame(age, game);

    const ageText = translate(age, TranslationType.AGE);
    const gameDescText = translate(gameData.title, TranslationType.GAME);
    return (
        ctx.data.length !== 0
            ? (
                ctx.questionsLeft === 0 ?
                    (   //End of game screen
                        <GameEnd title={`${ageText}: ${gameDescText}`}
                            score={{ value: ctx.score, max: ctx.data.length }} time={{ value: time, on: options.showStopwatch }} />
                    )
                    :
                    (   //Game             
                        <section className={`game quiz ${game}${shake ? ' shake' : ''}`}>
                            <header className="header">
                                <Stopwatch run={runStopwatch} on={options.showStopwatch} time={time} setTime={setTime} width={game !== 'flags' ? '25%' : '49%'} />
                                {game !== 'flags' ?
                                    <article className="title-container title">
                                        <p className='game-title'>{translate(question.feature, game === Game.CAPITALS ? Game.FLAGS : game)}</p>
                                    </article> : ''}

                                <article className="title-container score" style={{ width: game !== 'flags' ? '25%' : '49%' }}>
                                    {ctx.data ? <p className='game-title'>{`${ctx.score}/${ctx.data.length}`}</p> : ''}
                                </article >
                            </header >
                            <article className="game-img-container">
                                {question?.image}
                            </article>
                            <div className={`btn-container ${isAnswered ? 'answered' : ''}`}>
                                {question?.answers?.map(answer => <Button onClick={(e) => answerQuestionHandler(e, question.condition, answer)} key={answer} data-answer={answer}>{translate(answer, game)}</Button>)}
                                {(isAnswered && options.showAnswers) ?
                                    <article className="next-modal">
                                        <Button className='next-btn' onClick={(e) => nextQuestionHandler(e, question.condition)}>{ctx.questionsLeft > 0 ? dict.misc.Next : dict.misc.End}</Button>
                                    </article> : ''}
                            </div>
                        </section>
                    )
            )
            : <GameStartMenu content={{ title: `${ageText}: ${gameDescText}`, image: gameData.image }}
                startGame={startGameHandler} age={age} game={game} />
    )
}