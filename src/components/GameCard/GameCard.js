import { useNavigate } from 'react-router-dom'
import './GameCard.css'
import Button from '../Common/Button';

export default function GameCard({ data, onClick: customClickHandler = null, active = false, disabled = false }) {
    const navigate = useNavigate();

    const clickHandler = () => {
        if (disabled)
            return;

        customClickHandler
            ? customClickHandler(data)
            : navigate(data.link);
    }

    return (
        <section className={'card' + (active ? ' card-active' : '') + (disabled ? ' card-disabled' : '')} onClick={clickHandler}>
            <article className="card-img">
                <img draggable="false" src={data.image} alt={data.title} loading='lazy' />
            </article>
            <article className='card-btn-wrapper'>
                <Button className={disabled ? 'btn-disabled' : ''}>{data.title}</Button>
            </article>
        </section >
    )
}