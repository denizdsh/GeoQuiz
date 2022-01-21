import { useNavigate } from 'react-router-dom'
import './GameCard.css'

export default function GameCard({ data }) {
    const navigate = useNavigate();

    return (
        <section className='card' onClick={() => navigate(data.link)}>
            <article className="card-img">
                <img src={data.image} alt={data.title} />
            </article>
            <article className='card-btn-wrapper'>
                <button className='card-btn' type="button">
                    {data.title}
                </button>
            </article>
        </section >
    )
}