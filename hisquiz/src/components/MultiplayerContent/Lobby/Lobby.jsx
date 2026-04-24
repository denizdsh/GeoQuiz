import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLobbyByName } from '../../../services/multiplayerService';
import LobbyInfo from '../LobbyInfo/LobbyInfo';
import OtherPlayers from '../OtherPlayers/OtherPlayers';
import You from '../You/You';
import InGameView from '../InGameView/InGameView';
import styles from './Lobby.module.css';
import { useMultiplayer } from '../../../hooks/useMultiplayer';
import { useTranslation } from '../../../hooks/useTranslation';

export default function Lobby() {
    const { name } = useParams();
    const navigate = useNavigate();
    const { dict } = useTranslation();
    const { player, lobby, setLobby, resetLobby } = useMultiplayer();

    const isPlayerInLobby = Object.hasOwn(lobby?.players, player?.uid)

    useEffect(() => {
        if (!player || !player.uid) {
            console.log('waiting for authentication');
            return;
        }

        (async () => {
            try {
                const newLobby = await getLobbyByName(name);
                if (!newLobby.players
                    || !Object.hasOwn(newLobby.players, player.uid)) {
                    console.log('Not in lobby. redirecting...')
                    navigate(`/multiplayer/lobby/${name}/join`, { replace: true });

                    return;
                }

                if (newLobby.inGame) {
                    navigate(`/multiplayer`, { replace: true });
                    alert(dict.warning.LobbyBusy);
                    return;
                }

                setLobby(newLobby);
            }
            catch (err) {
                navigate('/multiplayer', { replace: true });
                alert(err.message);
                return;
            }
        })()

    }, [name, setLobby, navigate, player, isPlayerInLobby])

    useEffect(() => { // reset lobby in context after exiting page
        return () => resetLobby();
    }, [])

    return (
        lobby.inGame
            ? <InGameView />
            : <LobbyView />
    )
}

function LobbyView() {
    return (
        <section className={styles.container + ' slide'}>
            <section className={styles.content}>
                <article className={styles.players}>
                    <You disabled={true} />
                    <OtherPlayers />
                </article>
                <LobbyInfo disabled={true} />
            </section>
        </section >
    );
}