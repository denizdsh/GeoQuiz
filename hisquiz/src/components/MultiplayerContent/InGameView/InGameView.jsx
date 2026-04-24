import { useState, useEffect, useRef, useCallback } from "react";

import { QuizProvider } from "../../../contexts/QuizContext";
import Quiz from "../../Quiz/Quiz";

import styles from './InGameView.module.css';
import GameOverlay from "../GameOverlay/GameOverlay";
import { useMultiplayer } from "../../../hooks/useMultiplayer";
import { useTranslation } from "../../../hooks/useTranslation";

export default function InGameView() {
    const { lobby, updateScore } = useMultiplayer();
    const { dict } = useTranslation();
    const [started, setStarted] = useState(false);
    const gameIntroRef = useRef(null);

    useEffect(() => {
        if (!gameIntroRef.current) {
            return;
        }

        const output = ['3...', '2...', '1...', dict.misc.GameStartMsg];
        let i = 0;

        const interval = setInterval(() => {
            if (i >= output.length) {
                setStarted(true);
                clearInterval(interval);
                return;
            }

            gameIntroRef.current.textContent = output[i];
            i++;
        }, 1200)


        return () => clearInterval(interval);
    }, [])


    const Game = useCallback(() => {
        const gameData = lobby.game.slice(1).split('/'); // age/game

        const game = gameData.pop();
        const age = gameData.pop();

        return (
            <QuizProvider>
                <GameOverlay />
                <Quiz game={game} multiplayerData={{ age, options: lobby.options, updateScore }} />
            </QuizProvider>
        )
    }, []);

    return (
        <>
            {started
                ? <Game />
                : <h1 ref={gameIntroRef} className={styles.gameIntro + ' ' + styles.fadeInOut} />}
        </>
    );
}