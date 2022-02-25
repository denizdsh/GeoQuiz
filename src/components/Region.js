import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
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
            title: 'Countries',
            image: '/images/europe/map.png',
            link: '/europe/countries'
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
            image: '/images/australia-oceania/flags.png',
            link: '/australia-oceania/flags'
        },
        {
            title: 'Capitals',
            image: '/images/home/australia-oceania.png',
            link: '/australia-oceania/capitals'
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
            image: '/images/home/world.png',
            link: '/world/capitals'
        },
        {
            title: 'Countries',
            image: '/images/europe/map.png',
            link: '/world/countries'
        }
    ]
}

export default function Region() {
    const { region } = useParams();
    const { translate } = useContext(LanguageContext);

    const games = data[region].map(g => { return { ...g, key: g.title, title: translate('region', g.title) } })

    if (!data.hasOwnProperty(region)) {
        return (<p>404</p>)
        //TODO: error page
    }
    return (
        <Cards cards={games} />
    )
}