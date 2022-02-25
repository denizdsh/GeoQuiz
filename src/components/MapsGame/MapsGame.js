import { useState, useContext } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { MapsContext } from "../../contexts/MapsContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { NavContext } from "../../contexts/NavContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './MapsGame.css';
import Stopwatch from '../Common/Stopwatch'
import GameStartMenu from "../GameStartMenu/GameStartMenu";
import GameEnd from '../GameEnd/GameEnd';

const formattedRegions = {
    world: 'World',
    americas: 'American',
    africa: 'African',
    asia: 'Asian',
    'australia-oceania': 'Australia & Oceania',
    europe: 'European',
}
function MapsGame() {
    const navigate = useNavigate();

    const [showStopwatch, setShowStopwatch] = useState(false);
    const [time, setTime] = useState(0);
    const [runStopwatch, setRunStopwatch] = useState(false);

    const ctx = useContext(MapsContext);
    const { translate } = useContext(LanguageContext);
    const { enableNav } = useContext(NavContext);

    const { region } = useParams();

    const startGameHandler = ({ showStopwatch }) => {
        ctx.startGame(region);
        setShowStopwatch(showStopwatch);
        if (showStopwatch) setRunStopwatch(true);
    }

    const regionText = translate('misc', formattedRegions[region]);
    const gameDescText = translate('misc', `${region === 'world' ? 'World ' : ''}Countries`);
    if (ctx.score.max && !ctx.country) {
        enableNav()
    }
    return (
        ctx.score.max ?
            !ctx.country ?
                <GameEnd title={`${regionText} ${gameDescText}`}
                    score={{ value: ctx.score.current, max: ctx.score.max }} time={{ value: time, on: showStopwatch }} />
                :
                <>
                    <FontAwesomeIcon icon="fa-solid fa-circle-arrow-left" className='back-btn' onClick={() => navigate(-1)} />
                    <section className="map-header hide-header">
                        <Stopwatch run={runStopwatch} on={showStopwatch} time={time} setTime={setTime} />
                        <article className="title-container title">
                            <p className='game-title'>{translate('countries', ctx.country)}</p>
                        </article>
                        <article className="title-container score">
                            <p className='game-title'>{`${ctx.score.current}/${ctx.score.max}`}</p>
                        </article>
                    </section>
                    <article className="action-buttons">
                        <button className="delay" onClick={ctx.delayCountryHandler}>
                            {translate('misc', 'Delay')}
                        </button>
                        <button className="skip" onClick={ctx.skipCountryHandler}>
                            {translate('misc', 'Skip')}
                        </button>
                    </article>

                    <Map region={region} />
                </>

            : <GameStartMenu content={{ title: `${regionText} ${gameDescText}`, image: `/images/${region}/map.png` }} startGame={startGameHandler} region={'world'} />
    )
}

const containerStyle = {
    height: '100vh',
};
const center = {
    lat: 55,
    lng: 15
};
const zoom = window.innerWidth >= 800 ? 4.5 : 3;
const latLngBounds = {
    europe: {
        north: 72,
        south: 34,
        west: -26,
        east: 36
    }
}
const options = {
    mapId: '4132498b700a9b11',
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    restriction: { latLngBounds: latLngBounds.europe, strictBounds: false }
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

const smallCountries = {
    europe: [
        ['Andorra', { lat: 42.504648, lng: 1.522089 }],
        ['Liechtenstein', { lat: 47.140227, lng: 9.525021 }],
        ['Malta', { lat: 35.884146, lng: 14.402945 }],
        ['Monaco', { lat: 43.736974, lng: 7.421652 }],
        ['San Marino', { lat: 43.934514, lng: 12.447499 }],
        ['Vatican City', { lat: 41.903094, lng: 12.453412 }]
    ]
}

const formatToFeatureEvent = (x) => {
    return {
        feature: {
            j: {
                ADMIN: x[0]
            }
        },
        latLng: {
            lat: () => { return x[1].lat },
            lng: () => { return x[1].lng }
        }
    }
}

function Map({ region }) {
    const ctx = useContext(MapsContext);
    const [markers, setMarkers] = useState([]);
    const [smallMarkers, setSmallMarkers] = useState(smallCountries[region]);
    const [map, setMap] = useState();
    const [e, setE] = useState();
    const [prevE, setPrevE] = useState();
    const { translate } = useContext(LanguageContext);


    const addMarker = (position, text) => {
        setMarkers(markers => [...markers, { position, text }]);
    }

    const loadGeoJson = async (map) => {
        const geojson = await (await fetch('http://localhost:3000/geojson/europe.geojson')).json();
        await map.data.addGeoJson(geojson);
        map.data.setStyle({ icon: 0, fillColor: 'Gold', strokeWeight: 1, strokeColor: 'MediumSlateBlue' });

        setMap(map);
        map.data.addListener('click', (e) => setE(e));
    }

    const countryClickHandler = (event) => {
        if (!event) event = e;
        const targetCountry = event.feature.j.ADMIN;
        const isSmallCountry = smallMarkers.flat().includes(targetCountry);
        if (prevE !== event) {
            setPrevE(event);
            if (ctx.countries.concat(ctx.country).includes(targetCountry)) {
                ctx.updateScore(targetCountry);
                let color = 'red';
                if (targetCountry == ctx.country) {
                    color = 'green';
                    if (isSmallCountry) {
                        color = 'purple';
                        setSmallMarkers(smallMarkers => smallMarkers.filter(m => m[0] !== targetCountry));
                    }
                    addMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() }, ctx.country);
                    ctx.nextCountryHandler();
                }
                if (isSmallCountry) {
                    const smallCountry = Object.values(map.data.h.h).find(c => c.j.ADMIN == targetCountry);
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
                    options={options}
                    center={center}
                    zoom={zoom}
                    onLoad={loadGeoJson}
                >
                    {markers.length > 0 && markers.map(m =>
                        <Marker position={m.position} label={label(translate('countries', m.text))} options={markerOptions} icon={icon} key={`${m.text}-label`} />)}

                    {smallMarkers.length > 0 && smallMarkers.map(c =>
                        <Marker position={c[1]} icon='http://localhost:3000/icons/star_icon_marker.png'
                            onClick={() => countryClickHandler(formatToFeatureEvent(c))} key={`${c[0]}-smallCountry`} />)}
                </GoogleMap>
            </LoadScript >
        </div>
    )
}

export default MapsGame; //memo?