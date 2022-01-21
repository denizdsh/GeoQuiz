import Cards from '../Cards/Cards';

export default function Africa() {
    const games = [
        {
            title: 'Flags',
            image: '/images/africa/flags.png',
            link: '/africa/flags'
        },
        {
            title: 'Capitals',
            image: '/images/home/africa.png',
            link: '/africa/capitals'
        }
    ]

    return (
        <Cards cards={games} />
    )
}