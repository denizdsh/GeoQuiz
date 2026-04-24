import './Cards.css';
import GameCard from "../GameCard/GameCard";

export default function Cards({ cards }) {
    return (
        <section className="cards slide">
            {cards.map(data => <GameCard data={data} key={data.key || data.link} />)}
        </section>
    )
}