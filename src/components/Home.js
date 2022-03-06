import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import Cards from "./Cards/Cards";

export default function Home() {
    const { translate } = useContext(LanguageContext)
    const regions = [
        {
            title: translate('World', 'region'),
            image: '/images/home/world.png',
            link: '/world'
        },
        {
            title: translate('Africa', 'region'),
            image: '/images/home/africa.png',
            link: '/africa'
        },
        {
            title: translate('Americas', 'region'),
            image: '/images/home/americas.png',
            link: '/americas'
        },
        {
            title: translate('Asia', 'region'),
            image: '/images/home/asia.png',
            link: '/asia'
        },
        {
            title: translate('Australia & Oceania', 'region'),
            image: '/images/home/australia-oceania.png',
            link: '/australia-oceania'
        },
        {
            title: translate('Europe', 'region'),
            image: '/images/home/europe.png',
            link: '/europe'
        }
    ];

    return (
        <Cards cards={regions} />
    )
}