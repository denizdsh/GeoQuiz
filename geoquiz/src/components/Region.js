import { useParams } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from '../contexts/LanguageContext';
import { games as data } from "../services/contentService";
import Cards from "./Cards/Cards";
import NotFound from "./NotFound/NotFound";


export default function Region() {
    const { region } = useParams();
    const { translate } = useContext(LanguageContext);

    if (!data.hasOwnProperty(region)) {
        return <NotFound />
    }

    const games = data[region].map(g => { return { ...g, key: g.title, title: translate(g.title, 'game') } })

    return (
        <Cards cards={games} />
    )
}