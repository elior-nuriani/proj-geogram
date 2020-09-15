import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import mapStyle from '../services/mapStyle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';

function BaseMap({ posts }) {
    const prevMarkerRef = useRef(posts);

    useEffect(() => {
        if (prevMarkerRef.current.length !== posts.length) {
            console.log('reset')
            console.log(document.querySelectorAll('.mark'))
        }

    }, [posts]);


    const [selectedLocation, setSelectedLocation] = useState(null)
    const baseLocationCoords = { lat: 32.0854162, lng: 34.7817131 };
    const elMarkers = posts.map((post, idx) => {
        return (<Marker
            className="mark"
            key={idx}
            position={post.coords}
            onClick={() => {
                setSelectedLocation(post)
            }}
            animation={window.google.maps.Animation.DROP}
        // icon={{
        //     url:`${post.imgs[0]}`,
        //     scaledSize: new window.google.maps.Size(30,30)
        // }}
        ></Marker>)
    });

    return (
        <div>
            <GoogleMap key={posts.length} defaultZoom={1.5} defaultCenter={baseLocationCoords} defaultOptions={{ styles: mapStyle }}>
                {elMarkers}
                {selectedLocation && (
                    <InfoWindow
                        position={{
                            lat: selectedLocation.coords.lat,
                            lng: selectedLocation.coords.lng
                        }}
                        onCloseClick={() => {
                            setSelectedLocation(null)
                        }}
                    >
                        <div className="info-window flex row center space-between">
                            <div className="post-img" style={{ backgroundImage: `url(${selectedLocation.imgs[0]})` }}>
                            </div>
                            <div className="post-info">
                                <h2>{selectedLocation.title}</h2>
                                <p className="where">where : {selectedLocation.where}</p>
                                <p className="desc">{selectedLocation.desc}</p>
                                <p className>{selectedLocation.about}</p>
                            </div>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(BaseMap))


export default function Map({ posts }) {

    function toggleMapListOpen(){
        document.querySelector('.btn-globe').classList.toggle('open');
        document.querySelector('.map-info-section').classList.toggle('open')

    }


    return (
        <div className="map" style={{ width: "100%", height: '75vh' }}>
            <div onClick={() => {toggleMapListOpen()}} className="btn-globe btn flex row center">
                <FontAwesomeIcon icon={faGlobeAmericas} />
            </div>
            <WrappedMap
                posts={posts}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.GL_KEY}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
}