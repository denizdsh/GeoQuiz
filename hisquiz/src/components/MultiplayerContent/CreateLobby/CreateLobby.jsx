import LobbyInfo from '../LobbyInfo/LobbyInfo';
import You from '../You/You';
import styles from './CreateLobby.module.css';

export default function CreateLobby() {
    return (
        <section className={styles.container + ' slide'}>
            <section className={styles.content}>
                <You />
                <LobbyInfo isCreate={true} />
            </section>
        </section>
    )
}