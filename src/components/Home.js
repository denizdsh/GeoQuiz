import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import Cards from "./Cards/Cards";

export default function Home() {
    const { translate } = useContext(LanguageContext)
    const regions = [
        {
            title: translate('region', 'World'),
            image: '/images/home/world.png',
            link: '/world'
        },
        {
            title: translate('region', 'Africa'),
            image: '/images/home/africa.png',
            link: '/africa'
        },
        {
            title: translate('region', 'Americas'),
            image: '/images/home/americas.png',
            link: '/americas'
        },
        {
            title: translate('region', 'Asia'),
            image: '/images/home/asia.png',
            link: '/asia'
        },
        {
            title: translate('region', 'Australia & Oceania'),
            image: '/images/home/australia-oceania.png',
            link: '/australia-oceania'
        },
        {
            title: translate('region', 'Europe'),
            image: '/images/home/europe.png',
            link: '/europe'
        }
    ];

    return (
        <Cards cards={regions} />
    )
}