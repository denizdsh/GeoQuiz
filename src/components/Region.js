import { useParams } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from '../contexts/LanguageContext';

import Cards from "./Cards/Cards";

const data = {
    africa: [
        {
            title: 'Flags',
            image: '/images/africa/flags.png',
            link: '/africa/flags'
        },
        {
            title: 'Capitals',
            image: '/images/africa/capitals.png',
            link: '/africa/capitals'
        },
        {
            title: 'Countries',
            image: '/images/africa/map.png',
            link: '/africa/countries'
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
            image: '/images/americas/capitals.png',
            link: '/americas/capitals'
        },
        {
            title: 'Countries',
            image: '/images/americas/map.png',
            link: '/americas/countries'
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
            image: '/images/asia/capitals.png',
            link: '/asia/capitals'
        },
        {
            title: 'Countries',
            image: '/images/asia/map.png',
            link: '/asia/countries'
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
            image: '/images/europe/capitals.png',
            link: '/europe/capitals'
        },
        {
            title: 'Countries',
            image: '/images/europe/map.png',
            link: '/europe/countries'
        },
        {
            title: 'Provinces of Bulgaria',
            image: '/images/bulgaria/map.png',
            link: '/bulgaria/provinces'
        }
    ],
    'australia-oceania': [
        {
            title: 'Flags',
            image: '/images/australia-oceania/flags.png',
            link: '/australia-oceania/flags'
        },
        {
            title: 'Capitals',
            image: '/images/australia-oceania/capitals.png',
            link: '/australia-oceania/capitals'
        },
        {
            title: 'Countries',
            image: '/images/australia-oceania/map.png',
            link: '/australia-oceania/countries'
        }
    ],
    world: [
        {
            title: 'Flags',
            image: '/images/world/flags.png',
            link: '/world/flags'
        },
        {
            title: 'Capitals',
            image: '/images/world/capitals.png',
            link: '/world/capitals'
        },
        {
            title: 'Countries',
            image: '/images/world/map.png',
            link: '/world/countries'
        }
    ]
}

export default function Region() {
    const { region } = useParams();
    const { translate } = useContext(LanguageContext);

    const games = data[region].map(g => { return { ...g, key: g.title, title: translate(g.title, 'game') } })

    if (!data.hasOwnProperty(region)) {
        return (<p>404</p>)
        //TODO: error page
    }
    return (
        <Cards cards={games} />
    )
}