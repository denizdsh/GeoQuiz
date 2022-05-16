import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../contexts/LanguageContext';
import Button from '../Common/Button';
import styles from './NotFound.module.css';

export default function NotFound() {
    const navigate = useNavigate();
    const { translate } = useContext(LanguageContext);

    return (
        <section className={`${styles.container} slide`}>
            <h1 className={styles.title}>
                404
            </h1>
            <p className={styles.content}>
                {translate('Page not found', 'misc')}
            </p>
            <Button className={styles.button} onClick={() => navigate('/', { replace: true })}>
                {translate('Return to home page', 'misc')}
            </Button>
        </section>
    )
}