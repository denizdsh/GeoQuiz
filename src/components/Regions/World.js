import Cards from '../Cards/Cards';

export default function World() {
    const games = [
        {
            title: 'Flags',
            image: '/images/world/flags.png',
            link: '/world/flags'
        }
    ]

    return (
        <Cards cards={games} />
    )
}