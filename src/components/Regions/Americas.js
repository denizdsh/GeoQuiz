import Cards from '../Cards/Cards';

export default function Americas() {
    const games = [
        {
            title: 'Flags',
            image: '/images/americas/flags.png',
            link: '/americas/flags'
        },
        {
            title: 'Capitals',
            image: '/images/home/americas.png',
            link: '/americas/capitals'
        }
    ]

    return (
        <Cards cards={games} />
    )
}