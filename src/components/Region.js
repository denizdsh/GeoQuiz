import { useParams } from "react-router-dom";
import Cards from "./Cards/Cards";

const games = {
    africa: [
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
    ],
    americas: [
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
    ],
    asia: [
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
    ],
    europe: [
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
    ],
    'australia-oceania': [
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
    ],
    world: [
        {
            title: 'Flags',
            image: '/images/world/flags.png',
            link: '/world/flags'
        }
    ]
}

export default function Region() {
    const { region } = useParams();
    if (!games.hasOwnProperty(region)) {
        return (<p>404</p>)
        //TODO: error page
    }
    return (
        <Cards cards={games[region]} />
    )
}