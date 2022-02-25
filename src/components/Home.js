import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import Cards from "./Cards/Cards";

export default function Home() {
    const { translate } = useContext(LanguageContext)
    const regions = [
        {
            title: translate('home', 'World'),
            image: '/images/home/world.png',
            link: '/world'
        },
        {
            title: translate('home', 'Africa'),
            image: '/images/home/africa.png',
            link: '/africa'
        },
        {
            title: translate('home', 'Americas'),
            image: '/images/home/americas.png',
            link: '/americas'
        },
        {
            title: translate('home', 'Asia'),
            image: '/images/home/asia.png',
            link: '/asia'
        },
        {
            title: translate('home', 'Australia & Oceania'),
            image: '/images/home/australia-oceania.png',
            link: '/australia-oceania'
        },
        {
            title: translate('home', 'Europe'),
            image: '/images/home/europe.png',
            link: '/europe'
        }
    ];

    return (
        <Cards cards={regions} />
    )
}