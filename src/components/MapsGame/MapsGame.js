import { useState, useContext, memo } from "react"
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
    const { enableNav, disableNav } = useContext(NavContext);

    const { region } = useParams();

    const startGameHandler = ({ showStopwatch }) => {
        disableNav();
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
                <section className="game maps-end">
                    <GameEnd title={`${regionText} ${gameDescText}`}
                        score={{ value: ctx.score.current, max: ctx.score.max }}
                        time={{ value: time, on: showStopwatch }}
                        timePerQuestion={10} />
                </section>
                :
                <>
                    <section className="map-header">
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
    world: {
        north: 180,
        south: -180,
        west: -180,
        east: 180
    },
    africa: {
        north: 38,
        south: -38,
        west: -30,
        east: 66
    },
    americas: {
        north: 69,
        south: -60,
        west: -177,
        east: -26
    },
    asia: {
        north: 80,
        south: -11,
        west: 18,
        east: 180
    },
    'australica-oceania': {
        north: 1,
        south: -48,
        west: 108,
        east: -157
    },
    europe: {
        north: 78,
        south: 14,
        west: -26,
        east: 56
    },
}
const options = (region) => {
    return {
        mapId: '4132498b700a9b11',
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        restriction: { latLngBounds: latLngBounds[region], strictBounds: false }
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

const smallCountries = {
    europe: [
        ['Andorra', { lat: 42.504648, lng: 1.522089 }],
        ['Liechtenstein', { lat: 47.140227, lng: 9.525021 }],
        ['Malta', { lat: 35.884146, lng: 14.402945 }],
        ['Monaco', { lat: 43.736974, lng: 7.421652 }],
        ['San Marino', { lat: 43.934514, lng: 12.447499 }],
        ['Vatican City', { lat: 41.903094, lng: 12.453412 }]
    ],
    asia: [
        ['Bahrain', { lat: 26.220286, lng: 50.550944 }],
        ['Brunei', { lat: 4.742270, lng: 114.573702 }],
        ['Kuwait', { lat: 29.679911, lng: 47.890260 }],
        ['Lebanon', { lat: 34.267441, lng: 35.696224 }],
        ['Maldives', { lat: 4.175137, lng: 73.510096 }],
        ['Palestine', { lat: 32.156861, lng: 35.280103 }],
        ['Singapore', { lat: 1.421580, lng: 103.771587 }],
    ],
    /*
    africa: [
        ['', { lat:  lng:  }],
        ['', { lat:  lng:  }],
        ['', { lat:  lng:  }],
        ['', { lat:  lng:  }],
        ['', { lat:  lng:  }],
        ['', { lat:  lng:  }],
        ['', { lat:  lng:  }],
        ['', { lat:  lng:  }]
    ],
    americas: [
        ['', { lat:  lng:  }],
        ['', { lat:  lng:  }],
        ['', { lat:  lng:  }],
        ['', { lat:  lng:  }],
        ['', { lat:  lng:  }],
        ['', { lat:  lng:  }],
        ['', { lat:  lng:  }],
        ['', { lat:  lng:  }]
    ],
    'australica-oceania': [
        ['', { lat:  lng:  }],
        ['', { lat:  lng:  }],
        ['', { lat:  lng:  }],
        ['', { lat:  lng:  }],
        ['', { lat:  lng:  }],
        ['', { lat:  lng:  }],
        ['', { lat:  lng:  }],
        ['', { lat:  lng:  }]
    ]
    */
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
        const geojson = await (await fetch(`${process.env.NODE_ENV === 'production' ? process.env.REACT_APP_URL : 'http://localhost:3000'}/geojson/${region}.geojson`)).json();
        await map.data.addGeoJson(geojson);
        map.data.setStyle({ icon: 0, fillColor: 'Gold', strokeWeight: 1, strokeColor: 'MediumSlateBlue' });

        setMap(map);
        map.data.addListener('click', (e) => setE(e));
    }

    const countryClickHandler = (event) => {
        if (!event) event = e;
        const targetCountry = event.feature.j.ADMIN;
        console.log(targetCountry)
        const isSmallCountry = smallMarkers?.flat().includes(targetCountry);
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
                    console.log({ lat: event.latLng.lat(), lng: event.latLng.lng() });
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
                    options={options(region)}
                    center={center}
                    zoom={zoom}
                    onLoad={loadGeoJson}
                >
                    {markers && markers.map(m =>
                        <Marker position={m.position} label={label(translate('countries', m.text))} options={markerOptions} icon={icon} key={`${m.text}-label`} />)}

                    {smallMarkers && smallMarkers.map(c =>
                        <Marker position={c[1]} icon={`${process.env.NODE_ENV === 'production' ? process.env.REACT_APP_URL : 'http://localhost:3000'}/icons/star_icon_marker.png`}
                            onClick={() => countryClickHandler(formatToFeatureEvent(c))} key={`${c[0]}-smallCountry`} />)}
                </GoogleMap>
            </LoadScript >
        </div>
    )
}

export default memo(MapsGame);