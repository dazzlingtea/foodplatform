import React, { useEffect, useState, useCallback } from 'react';
import config from '../config/config';

const loadKakaoMapScript = (kakaoApiKey) => {
    return new Promise((resolve, reject) => {
        if (document.getElementById('kakao-map-script')) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.id = 'kakao-map-script';
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false`;
        script.async = true;
        script.onload = () => {
            window.kakao.maps.load(() => {
                resolve();
            });
        };
        script.onerror = () => reject(new Error('Kakao Map script load error'));
        document.head.appendChild(script);
    });
};

const KakaoMap = () => {
    const [markers, setMarkers] = useState([]); // State to store markers
    const maxMarkers = 3; // Maximum number of markers

    useEffect(() => {
        const { kakaoApiKey } = config;

        loadKakaoMapScript(kakaoApiKey)
            .then(() => {
                const container = document.getElementById('map'); // Div to display the map
                const options = {
                    center: new window.kakao.maps.LatLng(33.450701, 126.570667), // Map center coordinates
                    level: 3, // Zoom level
                };
                const map = new window.kakao.maps.Map(container, options); // Create the map

                // Check if geolocation is available
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        const lat = position.coords.latitude; // Latitude
                        const lon = position.coords.longitude; // Longitude

                        const locPosition = new window.kakao.maps.LatLng(lat, lon); // Position for the marker
                        const message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // Info window content

                        // Display the marker and info window
                        displayMarker(locPosition, message, map);
                    });
                } else {
                    const locPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
                    const message = 'geolocation을 사용할 수 없어요..';
                    displayMarker(locPosition, message, map);
                }

                // Click event to add markers
                window.kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
                    if (markers.length < maxMarkers) { // Check maximum marker limit
                        const latlng = mouseEvent.latLng; // Position clicked
                        addMarker(latlng, map); // Add marker
                    } else {
                        alert('최대 3개의 마커를 추가할 수 있습니다.'); // Alert for exceeding max markers
                    }
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, [markers]); // Re-run effect when markers state changes

    // Function to display a marker and an info window
    const displayMarker = (locPosition, message, map) => {
        const marker = new window.kakao.maps.Marker({
            map: map,
            position: locPosition,
        });

        const iwContent = message; // Info window content
        const iwRemoveable = true; // Allow the info window to be removed

        const infowindow = new window.kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable,
        });

        infowindow.open(map, marker); // Show the info window on the marker
        map.setCenter(locPosition); // Change the map center to the location
    };

    // Function to add a marker
    const addMarker = (latlng, map) => {
        const newMarker = new window.kakao.maps.Marker({
            position: latlng,
            map: map,
        });

        // Add click event to the new marker
        window.kakao.maps.event.addListener(newMarker, 'click', () => {
            console.log(`마커 좌표: ${latlng.getLat()}, ${latlng.getLng()}`); // Log marker coordinates
            removeMarker(newMarker); // Remove the marker when clicked
        });

        // Update the markers state
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    };

    // Function to remove a marker
    const removeMarker = (marker) => {
        marker.setMap(null); // Remove the marker from the map
        setMarkers((prevMarkers) => prevMarkers.filter(m => m !== marker)); // Update the markers state
    };

    return (
        <div>
            <div id="map" style={{ width: '100%', height: '400px' }}></div>
            <div id="clickLatlng" style={{ marginTop: '10px' }}></div>
        </div>
    );
};

export default KakaoMap;