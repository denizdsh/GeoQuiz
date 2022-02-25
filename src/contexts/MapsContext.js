import { createContext, useState } from "react";
import { countries as getCountries, nextCountry } from '../services/mapsService'

export const MapsContext = createContext();

export function MapsProvider({ children }) {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('');
    const [score, setScore] = useState({ current: 0, max: 0 });
    const [delayed, setDelayed] = useState([]);

    const startGame = (region) => {
        const data = getCountries(region);
        setScore({ current: 0, max: data.length });
        nextCountryHandler(data);
    }

    const nextCountryHandler = (data = countries) => {
        let current;
        if (data.length === 0 && countries.length === 0) {
            data = delayed;
            current = nextCountry(data);
            setDelayed(data.filter(x => x !== current));
        } else {
            current = nextCountry(data);
            setCountries(data.filter(x => x != current));
        }

        setCountry(current);
    }

    const delayCountryHandler = () => {
        let data;
        if (countries.length > 0) {
            data = countries.filter(x => x !== country);
            setCountries(data);
            setDelayed(delayed => delayed.concat(country));
        } else {
            data = delayed;
        }
        const current = nextCountry(data);
        setCountry(current);
        if (countries.length > 0) {
            setCountries(data.filter(x => x !== current));
        }

        updateScore();
    }

    const skipCountryHandler = () => {
        let data;
        if (countries.length > 0) {
            data = countries.filter(x => x !== country);
            setCountries(data);
        } else {
            data = delayed.filter(x => x !== country);
            setDelayed(data);
        }
        setCountry(nextCountry(data));
    }

    const updateScore = (targetCountry) => {
        const points = targetCountry == country ? 1 : -0.5;
        setScore(score => { return { current: score.current + points, max: score.max } });
    }

    const isSmallCountryAnswered = (smallCountry) => {
        return !countries.includes(smallCountry) && !delayed.includes(smallCountry);
    }

    return (
        <MapsContext.Provider value={{ countries, country, score, startGame, updateScore, nextCountryHandler, delayCountryHandler, skipCountryHandler, isSmallCountryAnswered }}>
            {children}
        </MapsContext.Provider>
    )
}