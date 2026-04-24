import { ages } from "../services/contentService";
import Cards from "./Cards/Cards";
import { TranslationType } from "../enums/lang/TranslationType";
import { useTranslation } from "../hooks/useTranslation";

export default function Home() {
    const { translate } = useTranslation();

    const data = ages.map(r => { return { ...r, title: translate(r.title, TranslationType.AGE) } });

    return (
        <Cards cards={data} />
    )
}