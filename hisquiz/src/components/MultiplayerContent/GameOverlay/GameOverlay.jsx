import { useEffect } from 'react';
import { useMultiplayer } from '../../../hooks/useMultiplayer';
import { useElements } from '../../../hooks/useElements';

import styles from './GameOverlay.module.css';

export default function GameOverlay() {
    const {
        enableBackBtn, disableBackBtn,
        enableAside, disableAside
    } = useElements();

    const { lobby } = useMultiplayer();

    useEffect(() => {
        disableBackBtn();
        disableAside();

        return () => {
            enableBackBtn();
            enableAside();
        };
    }, [])


    return (
        <ul className={styles.list}>
            {Object.values(lobby.players).sort((a, b) => b.score - a.score).slice(0, 5).map(PlayerTemplate)}
        </ul>
    );
}

function PlayerTemplate(player, index) {
    let username = player.username;

    if (index === 0) {
        username = `🏆 ${username} 🏆`;
    } else if (index === 1) {
        username = `🥈 ${username} 🥈`;
    } else if (index === 2) {
        username = `🥉 ${username} 🥉`;
    } else {
        username = `${index + 1}. ${username}`;
    }

    return (
        <li key={player.uid || username} className={styles.item}>
            <p className={styles.username}>
                {username}
            </p>

            <img className={styles.avatar} src={player.avatar} alt="avatar" />

            <p className={styles.score}>
                Score: {player.score.toFixed(2)}
            </p>
        </li>
    );
}