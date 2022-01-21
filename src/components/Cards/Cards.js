import './Cards.css';
import GameCard from "../GameCard/GameCard";

export default function Cards({ cards }) {

    return (
        <section className="cards">
            {cards.map(data => <GameCard data={data} key={data.title} />)}
        </section>
    )
}