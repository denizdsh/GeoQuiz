import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import Button from '../Common/Button';
import styles from './NotFound.module.css';

export default function NotFound() {
    const navigate = useNavigate();
    const { dict } = useTranslation();

    return (
        <section className={`${styles.container} slide`}>
            <h1 className={styles.title}>
                404
            </h1>
            <p className={styles.content}>
                {dict.misc.PageNotFound}
            </p>
            <Button className={styles.button} onClick={() => navigate('/', { replace: true })}>
                {dict.misc.ReturnHome}
            </Button>
        </section>
    )
}