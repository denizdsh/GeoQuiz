import Cards from '../Cards/Cards';

export default function Oceania() {
    const games = [
        {
            title: 'Flags',
            image: '/images/oceania/flags.png',
            link: '/oceania/flags'
        },
        {
            title: 'Capitals',
            image: '/images/home/australia-oceania.png',
            link: '/oceania/capitals'
        }
    ]

    return (
        <Cards cards={games} />
    )
}