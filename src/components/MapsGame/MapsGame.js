import { useState, useContext, memo, useEffect } from "react"
import { useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { MapsContext } from "../../contexts/MapsContext";
import { coordinates, smallCountries, formatToFeatureEvent } from "../../services/mapsService"
import { LanguageContext } from "../../contexts/LanguageContext";
import { NavContext } from "../../contexts/NavContext";
import { SoundContext } from "../../contexts/SoundContext";

import './MapsGame.css';
import Stopwatch from '../Common/Stopwatch'
import GameStartMenu from "../GameStartMenu/GameStartMenu";
import GameEnd from '../GameEnd/GameEnd';

function MapsGame({ title }) {
    const [showStopwatch, setShowStopwatch] = useState(false);
    const [time, setTime] = useState(0);
    const [runStopwatch, setRunStopwatch] = useState(false);

    const ctx = useContext(MapsContext);
    const { translate } = useContext(LanguageContext);
    const { enableNav, disableNav } = useContext(NavContext);
    const { sounds } = useContext(SoundContext);

    const { region } = useParams();

    const startGameHandler = ({ showStopwatch }) => {
        disableNav();
        ctx.startGame(region);
        setShowStopwatch(showStopwatch);
        if (showStopwatch) setRunStopwatch(true);
    }
    useEffect(() => {
        if (ctx.score.max && !ctx.country) {
            enableNav()
        }
    }, [ctx.score.max, ctx.country, enableNav])

    if (!title) {
        title = `${translate(region[0].toLocaleUpperCase().concat(region.slice(1)).replace('-o', ' & O'), 'region')}: ${translate('Countries', 'misc')}`;
    } else {
        title = `${translate(title, 'misc')} ${translate(region[0].toLocaleUpperCase().concat(region.slice(1)), 'country')} `;
    }
    return (
        ctx.score.max ?
            !ctx.country ?
                <GameEnd title={title}
                    score={{ value: ctx.score.current, max: ctx.score.max }}
                    time={{ value: time, on: showStopwatch }}
                    timePerQuestion={10} />
                :
                <>
                    <section className="map-features">
                        <section className="map-header">
                            <Stopwatch run={runStopwatch} on={showStopwatch} time={time} setTime={setTime} />
                            <article className="title-container title">
                                <p className='game-title'>{translate(ctx.country, 'country')}</p>
                            </article>
                            <article className="title-container score">
                                <p className='game-title'>{`${ctx.score.current} / ${ctx.score.max}`}</p >
                            </article >
                        </section >
                        <article className="action-buttons">
                            <button className="delay" onClick={() => {
                                sounds.switch();
                                ctx.delayCountryHandler()
                            }}>
                                {translate('Delay', 'misc')}
                            </button>
                            <button className="skip" onClick={() => {
                                sounds.switch();
                                ctx.skipCountryHandler()
                            }}>
                                {translate('Skip', 'misc')}
                            </button>
                        </article>
                    </section >

                    <Map region={region} />
                </>

            : <GameStartMenu content={{ title, image: `/images/${region}/map.png` }} startGame={startGameHandler} region={'world'} />
    )
}

const containerStyle = {
    height: '100vh',
};
const options = (region) => {
    return {
        mapId: '4132498b700a9b11',
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        restriction: { latLngBounds: coordinates[region].bounds, strictBounds: false }
    }
}
const label = (country) => {
    return {
        text: country,
        className: 'marker-label'
    }
};
const markerOptions = {
    animation: 1
};
const icon = {
    path: 0,
    scale: 0,
}
const zoom = window.innerWidth > 1000 ? 4.5 : 3
function Map({ region }) {
    const ctx = useContext(MapsContext);
    const { sounds } = useContext(SoundContext);
    const [markers, setMarkers] = useState([]);
    const [smallMarkers, setSmallMarkers] = useState(region !== 'world' ? smallCountries[region] : Object.values(smallCountries).flat());
    const [map, setMap] = useState();
    const [e, setE] = useState();
    const [prevE, setPrevE] = useState();
    const { translate } = useContext(LanguageContext);

    const addMarker = (position, text) => {
        setMarkers(markers => [...markers, { position, text }]);
    }

    const loadGeoJson = async (map) => {
        console.log(region)
        const geojson = await (await fetch(`${process.env.NODE_ENV === 'production' ? process.env.REACT_APP_URL : 'http://localhost:3000'}/geojson/${region}.geojson`)).json();
        await map.data.addGeoJson(geojson);
        map.data.setStyle({ icon: 0, fillColor: 'Gold', strokeWeight: 1, strokeColor: 'MediumSlateBlue' });

        setMap(map);
        map.data.addListener('click', (e) => setE(e));
    }

    const countryClickHandler = (event) => {
        if (!event) event = e;
        const targetCountry = event.feature.j.ADMIN;

        if (process.env.NODE_ENV === 'production') {
            console.log(targetCountry)
            console.log({ lat: event.latLng.lat(), lng: event.latLng.lng() });
        }

        const isSmallCountry = smallMarkers?.flat().includes(targetCountry);

        if (prevE !== event) {
            sounds.answer();
            setPrevE(event);
            if (ctx.countries.concat(ctx.country).includes(targetCountry)) {
                ctx.updateScore(targetCountry);
                let color = 'red';
                if (targetCountry === ctx.country) {
                    color = 'green';
                    if (isSmallCountry) {
                        color = 'purple';
                        setSmallMarkers(smallMarkers => smallMarkers.filter(m => m[0] !== targetCountry));
                    }
                    addMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() }, ctx.country);
                    ctx.nextCountryHandler();
                }
                if (isSmallCountry) {
                    const smallCountry = Object.values(map.data.h.h).find(c => c.j.ADMIN === targetCountry);
                    map.data.overrideStyle(smallCountry, { fillColor: color });
                }
                map.data.overrideStyle(event.feature, { fillColor: color });
            }
        }
    }

    return (
        <div onClick={() => countryClickHandler()}>
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_MAPS_API}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    options={options(region)}
                    center={coordinates[region].center}
                    zoom={coordinates[region].zoom || zoom}
                    onLoad={loadGeoJson}
                >
                    {markers && markers.map(m =>
                        <Marker position={m.position} label={label(translate(m.text, 'country'))} options={markerOptions} icon={icon} key={`${m.text}-label`} />)}

                    {smallMarkers && smallMarkers.map(c =>
                        c && <Marker position={c[1]} icon={`${process.env.NODE_ENV === 'production' ? process.env.REACT_APP_URL : 'http://localhost:3000'}/icons/star_icon_marker.png`}
                            onClick={() => countryClickHandler(formatToFeatureEvent(c))} key={`${c[0]}-smallCountry`} />)}
                </GoogleMap>
            </LoadScript >
        </div>
    )
}
export default memo(MapsGame);