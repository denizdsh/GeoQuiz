import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { MultiplayerContext } from "../../../contexts/MultiplayerContext";

import { QuizProvider } from "../../../contexts/QuizContext";
import Quiz from "../../Quiz/Quiz";

import { MapsProvider } from "../../../contexts/MapsContext";
import MapsGame from "../../MapsGame/MapsGame";

import styles from './InGameView.module.css';
import GameOverlay from "../GameOverlay/GameOverlay";

export default function InGameView() {
    const { lobby, updateScore } = useContext(MultiplayerContext);
    const [started, setStarted] = useState(false);
    const gameIntroRef = useRef(null);

    useEffect(() => {
        if (!gameIntroRef.current) {
            return;
        }

        const output = ['3...', '2...', '1...', 'Game has started!'];
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
        const gameData = lobby.game.slice(1).split('/'); // region/subregion?/game

        const game = gameData.pop();
        const region = gameData.pop(); // #region THIS SHOULD BE AS SPECIFIED AS POSSIBLE (SUBREGION > REGION, BULGARIA > EUROPE, etc.)

        console.log(region, game);

        let ContextProvider, GameType;
        const additionalData = {};

        if (game === 'countries' || game === 'provinces') {
            ContextProvider = MapsProvider;
            GameType = MapsGame;

            if (game === 'provinces') {
                additionalData.title = 'Provinces of';
            }
        } else {
            ContextProvider = QuizProvider;
            GameType = Quiz;
        }

        return (
            <ContextProvider>
                <GameOverlay />
                <GameType {...additionalData} game={game} multiplayerData={{ region, options: lobby.options, updateScore }} />
            </ContextProvider>
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