import Cards from "./Cards/Cards";

export default function Home() {

    const regions = [
        {
            title: 'World',
            image: '/images/home/world.png',
            link: '/world'
        },
        {
            title: 'Africa',
            image: '/images/home/africa.png',
            link: '/africa'
        },
        {
            title: 'Americas',
            image: '/images/home/americas.png',
            link: '/americas'
        },
        {
            title: 'Asia',
            image: '/images/home/asia.png',
            link: '/asia'
        },
        {
            title: 'Australia & Oceania',
            image: '/images/home/australia-oceania.png',
            link: '/australia-oceania'
        },
        {
            title: 'Europe',
            image: '/images/home/europe.png',
            link: '/europe'
        }
    ];

    return (
        <Cards cards={regions} />
    )
}