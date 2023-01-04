import { useState, useContext, useRef, useEffect, memo } from "react"
import { useNavigate, useParams } from 'react-router-dom';

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { GeoJSON } from "react-leaflet/GeoJSON";
import { Marker } from "react-leaflet/Marker";

import { DivIcon, Icon } from "leaflet";

import { MapsContext } from "../../contexts/MapsContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { ElementsContext } from "../../contexts/ElementsContext";
import { SoundContext } from "../../contexts/SoundContext";
import { coordinates, smallCountries } from "../../services/mapsService"

import './MapsGame.css';
import Stopwatch from '../Common/Stopwatch'
import Loader from '../Common/Loader'
import GameStartMenu from "../GameStartMenu/GameStartMenu";
import GameEnd from '../GameEnd/GameEnd';
import { } from "leaflet";
import { LatLngBounds } from "leaflet";
import { getPoints } from "../../helper/calculateScore";

function MapsGame({ title, multiplayerData = null }) {
    const [showStopwatch, setShowStopwatch] = useState(false);
    const [time, setTime] = useState(0);
    const [runStopwatch, setRunStopwatch] = useState(false);

    const ctx = useContext(MapsContext);
    const { translate } = useContext(LanguageContext);
    const { enableNav, disableNav } = useContext(ElementsContext);
    const { sounds } = useContext(SoundContext);

    const region = useParams().region || multiplayerData.region;

    useEffect(() => {
        if (!multiplayerData) {
            return;
        }

        startGameHandler(multiplayerData.options);
    }, [])

    useEffect(() => {
        if (ctx.score.max && !ctx.country) {
            enableNav()
        }
    }, [ctx.score.max, ctx.country, enableNav])

    const startGameHandler = ({ showStopwatch }) => {
        disableNav();
        ctx.startGame(region);
        setShowStopwatch(showStopwatch);
        if (showStopwatch) setRunStopwatch(true);
    }

    const multiplayerUpdateScore = (scoreObj) => {
        multiplayerData?.updateScore(getPoints(scoreObj, { value: time }));
    }


    if (!title) {
        title = `${translate(region[0].toLocaleUpperCase().concat(region.slice(1)).replace('-o', ' & O'), 'region')}: ${translate('Countries', 'misc')}`;
    } else {
        title = `${translate(title, 'misc')} ${translate(region[0].toLocaleUpperCase().concat(region.slice(1)), 'country')} `;
    }
    return (
        ctx.score.max ?
            !ctx.country ?
                <GameEnd title={title}
                    score={ctx.score}
                    time={{ value: time, on: showStopwatch, perQuestion: 10 }} />
                :
                <>
                    <section className="map-features">
                        <section className="map-header">
                            <Stopwatch run={runStopwatch} on={showStopwatch} time={time} setTime={setTime} />
                            <article className="title-container title">
                                <p className='game-title'>{translate(ctx.country, 'country')}</p>
                            </article>
                            <article className="title-container score">
                                <p className='game-title'>{`${ctx.score.value} / ${ctx.score.max}`}</p >
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

                    <Map region={region} ctx={ctx} multiplayerUpdateScore={multiplayerUpdateScore} />
                </>

            : <GameStartMenu content={{ title, image: `/images/${region}/map.png` }} startGame={startGameHandler} region={'world'} />
    )
}

const placeholder = <div className="map-loader">
    <Loader className='relative-loader large-loader' />
    <h1>Loading</h1>
</div>;

function Map({ region, ctx, multiplayerUpdateScore }) {
    const navigate = useNavigate();

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

        const scoreObj = ctx.updateScore(country);
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

        multiplayerUpdateScore(scoreObj);

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
                    ? <GeoJSON key="leaflet-map-geojson"
                        data={geojson.features}
                        ref={geojsonRef}
                        eventHandlers={{ click: countryClickHandler }}>
                    </GeoJSON>
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