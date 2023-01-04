import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useCallback } from 'react';
import { MultiplayerContext, getRandomAvatar } from '../../../contexts/MultiplayerContext';
import Button from '../../Common/Button';
import Loader from '../../Common/Loader';
import styles from './You.module.css';


const AVATAR_HISTORY_MAX_LENGTH = 10;

export default function You({ disabled = false }) {
    const { player, username, setUsername, avatar, setAvatar, avatarHistory, setAvatarHistory } = useContext(MultiplayerContext);

    const newAvatar = useCallback(() => {
        const ra = getRandomAvatar();
        setAvatarHistory(ah => {
            let newHistory = ah.concat(ra)
            if (newHistory.length >= AVATAR_HISTORY_MAX_LENGTH) {
                newHistory.shift();
            }

            return newHistory;
        });

        return ra;
    }, [setAvatarHistory])

    const changeAvatarHandler = useCallback((back = false) => {
        if (disabled) {
            return;
        }

        if (back) {
            setAvatar((a) => {
                let i = avatarHistory.lastIndexOf(a);

                if (i <= 0)
                    return a;

                return avatarHistory[i - 1];
            })

            return;
        }

        setAvatar(a => {
            let i = avatarHistory.lastIndexOf(a);

            if (i !== -1 && i !== AVATAR_HISTORY_MAX_LENGTH - 1 && avatarHistory.length >= i + 2) {
                return avatarHistory[i + 1];
            }

            return newAvatar();
        })
    }, [avatarHistory, newAvatar, setAvatar, disabled])

    const changeUsernameHandler = (e) => {
        if (disabled) {
            return;
        }
        
        setUsername(e.target.value);
    }

    return (
        <section className={styles.data}>

            {player ?
                <>
                    <h1 className={styles.title}>
                        You
                    </h1>
                    <article className={styles.usernameContainer}>
                        <input type="text" onChange={changeUsernameHandler} disabled={disabled} className={styles.username} placeholder={player.username || 'Username'} defaultValue={username} />
                    </article>
                    <article className={styles.avatarContainer}>
                        {disabled || <Button className={styles.button + ' ' + (avatarHistory.indexOf(avatar) === 0 ? styles.disabled : '')} onClick={() => changeAvatarHandler(true)}>
                            <FontAwesomeIcon icon="fa-solid fa-angle-left" />
                        </Button>}
                        <div className={styles.imageContainer}>
                            <img draggable="false" src={avatar} alt="Loading..." className={styles.image} />
                        </div>
                        {disabled || <Button className={styles.button} onClick={() => changeAvatarHandler()}>
                            <FontAwesomeIcon icon="fa-solid fa-angle-right" />
                        </Button>}
                    </article>
                </>
                :
                <Loader />
            }

        </section>
    )
}