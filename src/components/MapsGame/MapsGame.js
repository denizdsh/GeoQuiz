import { useState, useContext, useRef, useEffect, memo } from "react"
import { useNavigate, useParams } from 'react-router-dom';

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { GeoJSON } from "react-leaflet/GeoJSON";
import { Marker } from "react-leaflet/Marker";

import { DivIcon, Icon } from "leaflet";

import { MapsContext } from "../../contexts/MapsContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { NavContext } from "../../contexts/NavContext";
import { SoundContext } from "../../contexts/SoundContext";
import { coordinates, smallCountries } from "../../services/mapsService"

import './MapsGame.css';
import Stopwatch from '../Common/Stopwatch'
import GameStartMenu from "../GameStartMenu/GameStartMenu";
import GameEnd from '../GameEnd/GameEnd';
import { } from "leaflet";
import { LatLngBounds } from "leaflet";

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

const placeholder = <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>Loading...</h1>;

function Map({ region }) {
    const navigate = useNavigate();

    const ctx = useContext(MapsContext);
    const { sounds } = useContext(SoundContext);
    const { translate } = useContext(LanguageContext);

    const geojsonRef = useRef(null);
    const [geojson, setGeojson] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [smallMarkers, setSmallMarkers] = useState(region !== 'world'
        ? smallCountries[region]
        : Object.values(smallCountries).flat()
    );

    useEffect(() => {
        //loadGeoJson()
        (async () => {
            try {
                const res = await fetch(`${process.env.NODE_ENV === 'production'
                    ? process.env.REACT_APP_URL
                    : 'http://localhost:3000'}/geojson/${region}.geojson`);

                setGeojson((await res.json()));
            } catch (err) {
                navigate('/');
                alert('Error occured. Please try again later.')
            }
        })();
    }, [navigate, region])


    const handleClick = (country, position) => {
        if (!ctx.countries.concat(ctx.country).includes(country))
            return;

        const isSmallCountry = smallMarkers?.flat().includes(country);

        sounds.answer();

        ctx.updateScore(country);
        let color = 'red';
        if (country === ctx.country) {
            color = 'green';
            if (isSmallCountry) {
                color = 'purple';
                setSmallMarkers(smallMarkers => smallMarkers.filter(m => m[0] !== country));
            }
            setMarkers(markers => markers.concat({ country, position, isSmallCountry }))

            ctx.nextCountryHandler();
        }

        return color;
    }

    const countryClickHandler = (e) => {
        const country = e.sourceTarget.feature.properties.ADMIN;
        const position = e.latlng;

        let color = handleClick(country, position)

        if (color)
            e.sourceTarget.setStyle({ color });
    }

    const smallCountryMarkerClickHandler = (e) => {
        const country = e.sourceTarget.options.country;
        const position = e.latlng;

        let color = handleClick(country, position);

        //find geojson layer corresponding to the name of the country
        if (color)
            Object.values(geojsonRef.current._layers)
                .find(l => l.feature.properties.ADMIN === country)
                .setStyle({ color });
    }


    const smallCountryIconUrl = `${process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_URL
        : 'http://localhost:3000'}/icons/star_icon_marker.png`;

    return (
        <MapContainer className="map"
            center={coordinates[region].center || [90, 0]}
            zoom={coordinates[region].zoom || 4}
            maxBounds={new LatLngBounds(coordinates[region].bounds.southWest, coordinates[region].bounds.northEast)}
            placeholder={placeholder} >
            <TileLayer
                url={process.env.REACT_APP_MAPBOX_MAP_URL}
            />
            {
                geojson
                    ? <GeoJSON key="leaflet-map-geojson" data={geojson.features} ref={geojsonRef} eventHandlers={{
                        click: countryClickHandler
                    }}></GeoJSON>
                    : placeholder
            }

            {
                markers.map(m =>
                    <Marker key={`${m.country}-marker-${Math.random()}`}
                        position={m.position}
                        className='leaflet-marker-icon'
                        alt={m.country}
                        title={m.country}
                        icon={new DivIcon({
                            html: (() => {
                                let el = document.createElement('p');
                                el.classList.add('leaflet-marker-text');
                                if (m.isSmallCountry)
                                    el.classList.add('purple-background');

                                el.textContent = translate(m.country, 'country');
                                return el;
                            })()
                        })}>
                    </Marker>
                )
            }
            {
                smallMarkers?.map(m =>
                    //LatLng {lat: 44.4725963410165, lng: 20.524929377945732}
                    <Marker key={`${m.country}-popup-${Math.random()}`}
                        icon={new Icon({ iconUrl: smallCountryIconUrl, iconAnchor: [24, 48] })}
                        country={m[0]}
                        position={m[1]}
                        eventHandlers={{
                            click: smallCountryMarkerClickHandler
                        }} />
                )
            }
        </MapContainer >
    )
}
export default memo(MapsGame);