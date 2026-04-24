import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLobbyByName } from '../../../services/multiplayerService';
import styles from './JoinLobby.module.css';
import Button from '../../Common/Button';
import You from '../You/You';
import OtherPlayers from '../OtherPlayers/OtherPlayers';
import { useMultiplayer } from '../../../hooks/useMultiplayer';
import { useTranslation } from '../../../hooks/useTranslation';


export default function JoinLobby() {
    const { name } = useParams();
    const navigate = useNavigate();
    const { createPlayer, setLobby, player, resetLobby, lobby } = useMultiplayer();
    const { dict } = useTranslation();

    const isLobbyValid = !!lobby && !lobby.default;

    useEffect(() => {
        if (!player || !player.uid) {
            console.log('waiting for authentication');
            return;
        }

        (async () => {
            try {
                const newLobby = await getLobbyByName(name);

                if (newLobby.inGame) {
                    navigate(`/multiplayer`, { replace: true });
                    window.alert(dict.warning.LobbyBusy);
                    return;
                }

                if (newLobby.players
                    && Object.hasOwn(newLobby.players, player.uid)) {
                    console.log('Already in lobby. redirecting...')
                    navigate(`/multiplayer/lobby/${name}`, { replace: true });

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

    }, [name, setLobby, navigate, player, isLobbyValid])

    useEffect(() => { // reset lobby in context after exiting page
        return () => resetLobby();
    }, [])

    const joinHandler = async () => {
        if (lobby.inGame) {
            return alert(dict.warning.LobbyBusy);
        }

        console.log('joining lobby');

        try {
            await createPlayer(); // creates player with username and avatar from You.js component and then joins lobby 
        } catch (err) {
            return alert(err.message);
        }

        navigate(`/multiplayer/lobby/${name}`, { replace: true })
    }

    return (
        <section className={styles.container + ' slide'}>
            <section className={styles.playersContainer}>
                <You />
                <OtherPlayers />
            </section>
            <Button className={styles.actionButton} onClick={joinHandler}>Join</Button>
        </section >
    )
}