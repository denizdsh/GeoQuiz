import './GameCard.css'

export default function GameCard({ data }) {
    return (
        <section className='card'>
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