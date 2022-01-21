import Cards from '../Cards/Cards';

export default function Europe() {
    const games = [
        {
            title: 'Flags',
            image: '/images/europe/flags.png',
            link: '/europe/flags'
        },
        {
            title: 'Capitals',
            image: '/images/home/europe.png',
            link: '/europe/capitals'
        },
        {
            title: 'Provinces of Bulgaria',
            image: '/images/home/europe.png',
            link: '/europe/bulgaria'
        }
    ]

    return (
        <Cards cards={games} />
    )
}