import Cards from "./Cards/Cards";

export default function Home() {

    const regions = [
        {
            title: 'World',
            image: '/images/home/world.png',
            link: ''
        },
        {
            title: 'Africa',
            image: '/images/home/africa.png',
            link: ''
        },
        {
            title: 'Americas',
            image: '/images/home/americas.png',
            link: ''
        },
        {
            title: 'Asia',
            image: '/images/home/asia.png',
            link: ''
        },
        {
            title: 'Australia & Oceania',
            image: '/images/home/australia-oceania.png',
            link: ''
        },
        {
            title: 'Europe',
            image: '/images/home/europe.png',
            link: ''
        }
    ];

    return (
        <Cards cards={regions} />
    )
}