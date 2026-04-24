import { useParams } from "react-router-dom";
import { games as data } from "../services/contentService";
import Cards from "./Cards/Cards";
import NotFound from "./NotFound/NotFound";
import { TranslationType } from "../enums/lang/TranslationType";
import { useTranslation } from "../hooks/useTranslation";


export default function Age() {
    const { age } = useParams();
    const { translate } = useTranslation();

    if (!Object.hasOwn(data, age)) {
        return <NotFound />
    }

    const games = data[age].map(g => { return { ...g, key: g.title, title: translate(g.title, TranslationType.GAME) } })

    return (
        <Cards cards={games} />
    )
}