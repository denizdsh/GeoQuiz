import Cards from '../Cards/Cards';

export default function Asia() {
    const games = [
        {
            title: 'Flags',
            image: '/images/asia/flags.png',
            link: '/asia/flags'
        },
        {
            title: 'Capitals',
            image: '/images/home/asia.png',
            link: '/asia/capitals'
        }
    ]
    return (
        <Cards cards={games} />
    )
}