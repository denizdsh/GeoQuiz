import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { regions } from "../services/contentService";
import Cards from "./Cards/Cards";

export default function Home() {
    const { translate } = useContext(LanguageContext)

    const data = regions.map(r => { return { ...r, title: translate(r.title, 'region') } });

    return (
        <Cards cards={data} />
    )
}