import { useNavigate } from 'react-router-dom'
import './GameCard.css'
import Button from '../Common/Button';

export default function GameCard({ data }) {
    const navigate = useNavigate();

    return (
        <section className='card' onClick={() => navigate(data.link)}>
            <article className="card-img">
                <img src={data.image} alt={data.title} />
            </article>
            <article className='card-btn-wrapper'>
                <Button>{data.title}</Button>
            </article>
        </section >
    )
}