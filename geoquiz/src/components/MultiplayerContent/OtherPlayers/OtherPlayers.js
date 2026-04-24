import { useEffect, useState, useContext } from 'react';
import { MultiplayerContext } from '../../../contexts/MultiplayerContext';
import Loader from '../../Common/Loader';
import styles from './OtherPlayers.module.css';

export default function OtherPlayers() {
    const { player, lobby, setPlayer } = useContext(MultiplayerContext);
    const [otherPlayers, setOtherPlayers] = useState([]);
    const [isPlayerInLobby, setIsPlayerInLobby] = useState(false); // save as variable to avoid excessive function calling

    useEffect(() => {
        if (!lobby.players)
            return;

        let newOtherPlayers = Object.values(lobby.players);

        const tempIsPlayerInLobby = !!(player && player.uid && lobby.players.hasOwnProperty(player.uid));

        setIsPlayerInLobby(tempIsPlayerInLobby);

        if (tempIsPlayerInLobby) {
            const index = Object.keys(lobby.players).indexOf(player.uid);

            if (player.default)
                setPlayer(newOtherPlayers[index]);

            newOtherPlayers.splice(index, 1);
        }

        setOtherPlayers(newOtherPlayers);

    }, [lobby, setPlayer, player])

    return (
        lobby.default
            ? <section className={styles.otherPlayersContainer + ' fadeIn'}>
                <article className={styles.otherPlayersTitles}>
                    <h1 className={styles.title}>Loading...</h1>
                </article>
                <Loader className='relative-loader' />
            </section>
            : <section className={styles.otherPlayersContainer + ' fadeIn'}>

                <article className={styles.otherPlayersTitles}>
                    <h1 className={styles.title}>{lobby.name}</h1>
                    <h2 className={styles.secondaryTitle}>{otherPlayers.length + (isPlayerInLobby ? 1 : 0)} players in lobby</h2>
                </article>
                <section className={styles.otherPlayers}>
                    {isPlayerInLobby && playerTemplate(player, true)}
                    {otherPlayers.map(p => playerTemplate(p))}
                </section>

            </section>
    );
}

function playerTemplate(p, isCurrentUser = false) {
    return (
        <article key={p?.uid} className={styles.player}>
            <h3 className={styles.playerUsername}>{p?.username}{p.admin && ' (Admin)'}{isCurrentUser && ' (You)'}</h3>
            <article className={styles.playerImageContainer}>
                <img draggable="false" src={p?.avatar} alt="Loading..." className={styles.image} />
            </article>
        </article>
    );
}