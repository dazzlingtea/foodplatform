import React, { useEffect, useState } from 'react';
import styles from "./NaverMapWithSearch.module.scss";
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// type: 'customer' or 'store'
const NaverMapWithSearch = ({type, productDetail}) => {
    const [map, setMap] = useState(null);
    const [infoWindow, setInfoWindow] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [places, setPlaces] = useState([]);
    const [searchMarker, setSearchMarker] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);
    // const [type, setType] = useState('store');
    useEffect(() => {
        if (map) {
            // map이 설정된 후 실행할 코드
            fetchPlacesFromServer();
        }
    }, [map]);

    useEffect(() => {
        const ncpClientId = process.env.REACT_APP_YOUR_CLIENT_ID;
        if (ncpClientId) {
            const scriptUrl = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ncpClientId}&submodules=geocoder`;
            loadScript(scriptUrl)
                .then(() => {
                    if (window.naver && window.naver.maps) {
                        initMap();
                    } else {
                        console.error('Naver Maps API is not loaded properly');
                    }
                })
                .catch((error) => {
                    console.error('Failed to load Naver Map script', error);
                });
        } else {
            console.error('Client ID가 설정되지 않았습니다.');
        }
    }, []);

    const initMap = () => {

        if (type === 'store') {
            const storeName = productDetail.storeInfo.storeName;
            const storeAddress = productDetail.storeInfo.storeAddress;
            console.log(storeName, storeAddress);

            window.naver.maps.Service.geocode(
                { query: storeAddress },
                function (status, response) {
                    if (status === window.naver.maps.Service.Status.ERROR) {
                        console.error('Geocoding error');
                        return;
                    }

                    if (response.v2.meta.totalCount === 0) {
                        console.error('No results found for the address');
                        return;
                    }

                    const item = response.v2.addresses[0];
                    const latlng = new window.naver.maps.LatLng(item.y, item.x);

                    initializeMap(item.y, item.x); // Initialize map with store location
                    addPlace(latlng, storeName, item.roadAddress, item.jibunAddress, 'red'); // 색상 'red' 전달
                    console.log('Store location:', latlng.toString());
                    console.log("marker added");
                }
            );
        }
        if(type === 'customer') {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        initializeMap(latitude, longitude);
                    },
                    () => {
                        initializeMap(37.555183, 126.936883); // 중앙정보처리학원 신촌로176
                    }
                );
            } else {
                initializeMap(37.555183, 126.936883); // Geolocation을 지원하지 않는 경우
            }
        }
    };

    const initializeMap = (lat, lng) => {
        const mapOptions = {
            center: new window.naver.maps.LatLng(lat, lng),
            zoom: 15,
            mapTypeControl: true,
        };

        const mapInstance = new window.naver.maps.Map('map', mapOptions);
        setMap(mapInstance); // map 상태 설정

        const infoWindowInstance = new window.naver.maps.InfoWindow({
            anchorSkew: true,
        });
        setInfoWindow(infoWindowInstance);

        mapInstance.setCursor('pointer');
        mapInstance.addListener('click', function (e) {
            if (infoWindowInstance.getMap()) {
                infoWindowInstance.close();
            }
            if (places.length < 10) {
                addPlace(e.coord);
            } else {
                alert('최대 10개의 장소만 저장할 수 있습니다.');
            }
        });

        // 서버에서 장소 데이터를 가져와서 지도에 추가
        if(type === 'customer') {
            fetchPlacesFromServer();
        }else{
            addPlace(new window.naver.maps.LatLng(productDetail.storeInfo.lat, productDetail.storeInfo.lng), productDetail.storeInfo.storeName, productDetail.storeInfo.storeAddress, 'red');
        }
    };

    const fetchPlacesFromServer = async () => {
        try {
            const response = await fetch('/customer/info/area');
            const fetchedPlaces = response.ok ? await response.json() : [];

            console.log('Fetched places:', fetchedPlaces);

            setPlaces(fetchedPlaces);
            for (let place of fetchedPlaces) {
                await addPlaceByAddress(place.preferredArea, place.alias);
            }
        } catch (error) {
            console.error('Failed to fetch places from server:', error);
        }
    };

    const addPlaceByAddress = async (address, alias) => {
        if (!window.naver.maps.Service) {
            console.error('Naver Maps Service is not initialized');
            return;
        }

        window.naver.maps.Service.geocode(
            { query: address },
            function (status, response) {
                if (status === window.naver.maps.Service.Status.ERROR) {
                    console.error('Geocoding error');
                    return;
                }

                if (response.v2.meta.totalCount === 0) {
                    console.error('No results found for the address');
                    return;
                }

                const item = response.v2.addresses[0];
                const latlng = new window.naver.maps.LatLng(item.y, item.x);

                const newPlace = {
                    id: places.length + 1,
                    title: alias,
                    latlng: latlng,
                    roadAddress: item.roadAddress,
                    jibunAddress: item.jibunAddress
                };

                if (!map) {
                    console.error('Map instance is not initialized');
                    return;
                }

                setPlaces(prevPlaces => {
                    const updatedPlaces = [...prevPlaces, newPlace];
                    addMarker(newPlace, map, infoWindow, 'blue');
                    return updatedPlaces;
                });
            }
        );
    };

    const addPlace = (latlng, alias = `장소 ${places.length + 1}`, roadAddress, jibunAddress, color = 'skyblue') => {

        console.log('Adding place:', alias, latlng.toString());
        const newPlace = { id: places.length + 1, title: alias, latlng: latlng, roadAddress, jibunAddress };
        setPlaces(prevPlaces => {
            console.log('Adding place!!!!:', newPlace);
            const updatedPlaces = [...prevPlaces, newPlace];
            addMarker(newPlace, map, infoWindow, color);
            return updatedPlaces;
        });
    };

    const addMarker = (place, mapInstance, infoWindowInstance, color = 'skyblue') => {
        console.log('Adding marker!!!!!!!!!!!!!!!:', place.title)
        if (!mapInstance) {
            console.error('Map instance is not initialized');
            return;
        }

        if (!(place.latlng instanceof window.naver.maps.LatLng)) {
            console.error('Invalid LatLng object');
            return;
        }

        console.log(`Adding marker at ${place.latlng} with title: ${place.title}`);

        const markerOptions = {
            position: place.latlng,
            map: mapInstance,
            title: place.title,
            icon: {
                content: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
                anchor: new window.naver.maps.Point(10, 10)
            }
        };

        const marker = new window.naver.maps.Marker(markerOptions);

        window.naver.maps.Event.addListener(marker, 'click', () => {
            if (infoWindowInstance.getMap()) {
                infoWindowInstance.close();
            }
            setActiveMarker(marker);
            if (type === 'customer') {
                infoWindowInstance.setContent([
                    '<div className={styles.infoWindow}>',
                    `<h4 style="margin-top:5px;">${place.title}</h4>`,
                    place.roadAddress ? `<p>[도로명 주소] ${place.roadAddress}</p>` : '',
                    place.jibunAddress ? `<p>[지번 주소] ${place.jibunAddress}</p>` : '',
                    `<button onclick="document.getElementById('removeFav').click()">선호 지역에서 제거하기</button>`,
                    '</div>',
                ].join('\n'));
                infoWindowInstance.open(mapInstance, marker);
            }
        });
    };


    const searchAddressToCoordinate = (address) => {
        if (!window.naver.maps.Service || !infoWindow) {
            console.error('Naver Maps Service or InfoWindow is not initialized');
            return;
        }

        window.naver.maps.Service.geocode(
            { query: address },
            function (status, response) {
                if (status === window.naver.maps.Service.Status.ERROR) {
                    return alert('Something Wrong!');
                }

                if (response.v2.meta.totalCount === 0) {
                    return alert('검색 결과가 없습니다.');
                }

                const item = response.v2.addresses[0];
                const point = new window.naver.maps.Point(item.x, item.y);
                const latlng = new window.naver.maps.LatLng(item.y, item.x);

                if (searchMarker) {
                    searchMarker.setMap(null);
                }

                const markerOptions = {
                    position: latlng,
                    map: map,
                    title: address,
                    icon: {
                        content: `<div style="background-color: #e87a7a; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
                        anchor: new window.naver.maps.Point(10, 10)
                    }
                };

                const newSearchMarker = new window.naver.maps.Marker(markerOptions);
                setSearchMarker(newSearchMarker);

                const htmlAddresses = [];
                if (item.roadAddress) {
                    htmlAddresses.push(`[도로명 주소] <span class="roadAddress">${item.roadAddress}</span>`);
                }
                if (item.jibunAddress) {
                    htmlAddresses.push(`[지번 주소] <span class="jibunAddress">${item.jibunAddress}</span>`);
                }
                if (item.englishAddress) {
                    htmlAddresses.push(`[영문 주소] ${item.englishAddress}`);
                }

                infoWindow.setContent([
                    '<div style="padding:10px;min-width:200px;line-height:150%;">',
                    `<h4 style="margin-top:5px;">검색 주소 : ${address}</h4><br />`,
                    htmlAddresses.join('<br />'),
                    `<input type="text" id="aliasInput" placeholder="별칭 입력" style="margin-top:10px;" onkeydown="if(event.key === 'Enter'){document.getElementById('addFav').click();}" />`,
                    `<button onclick="document.getElementById('addFav').click()">선호 지역으로 추가하기</button>`,
                    '</div>',
                ].join('\n'));

                map.setCenter(point);
                infoWindow.open(map, newSearchMarker);
            }
        );
    };

    const addSearchMarkerToFavorite = async () => {
        if (searchMarker) {
            const aliasInput = document.getElementById('aliasInput');
            const aliasValue = aliasInput ? aliasInput.value : `장소 ${places.length + 1}`;
            const roadAddress = document.querySelector('.roadAddress')?.textContent || '';
            const jibunAddress = document.querySelector('.jibunAddress')?.textContent || '';
            const preferredArea = roadAddress || jibunAddress;

            console.log(preferredArea, aliasValue);
            addPlace(searchMarker.getPosition(), aliasValue, roadAddress, jibunAddress);

            // 서버에 추가 요청 보내기
            try {
                const response = await fetch('/customer/edit/area', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        preferredArea: preferredArea, // 위치 정보
                        alias: aliasValue,
                    })
                });

                // 응답을 JSON으로 파싱
                const result = await response.json();

                if (result) {
                    // 성공적으로 추가된 경우 처리
                    searchMarker.setMap(null);
                    setSearchMarker(null);
                    if (infoWindow.getMap()) {
                        infoWindow.close();
                    }
                } else {
                    alert('선호 지역 추가에 실패했습니다.');
                }
            } catch (error) {
                console.error('Error adding to favorites:', error);
            }
        }
    };

    const removePlaceFromFavorites = async (marker) => {
        if (marker) {
            const position = marker.getPosition();
            if (!position) {
                console.error('Marker position is undefined');
                return;
            }

            const placeToRemove = places.find(place => place.latlng && place.latlng.equals(position));
            if (placeToRemove) {
                try {
                    const response = await fetch('/customer/edit/area', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            preferredArea: placeToRemove.roadAddress || placeToRemove.jibunAddress,
                            alias: placeToRemove.title,
                        })
                    });

                    if (response.ok) {
                        setPlaces(prevPlaces => prevPlaces.filter(place => place !== placeToRemove));
                        marker.setMap(null);
                        if (infoWindow.getMap()) {
                            infoWindow.close();
                        }
                    } else {
                        alert('Failed to remove place from favorites.');
                    }
                } catch (error) {
                    console.error('Failed to remove place from favorites:', error);
                }
            } else {
                console.error('Place to remove not found');
            }
        } else {
            console.error('Marker is undefined');
        }
    };


    return (
        <div>
            {type === 'customer' ?
                <div>
                    <h2 className={styles.descText}>선호하는 지역의 도로명 주소를 입력해주세요</h2>
                    <input
                        className={styles.searchInput}
                        type="text"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        placeholder="주소 검색"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                searchAddressToCoordinate(searchKeyword);
                            }
                        }}
                    />
                    <button className={styles.searchBtn} onClick={() => searchAddressToCoordinate(searchKeyword)}>검색</button>
                    <button id="addFav" style={{display: 'none'}} onClick={addSearchMarkerToFavorite}>선호 지역으로 추가하기
                    </button>
                    <button id="removeFav" style={{display: 'none'}}
                            onClick={() => removePlaceFromFavorites(activeMarker)}>선호 지역에서 제거하기
                    </button>
                    <div id="map" style={{width: '100%', height: '400px'}}/>
                </div>
                : <div id="map" style={{width: '100%', height: '144px'}}/>
            }

        </div>
    );
};

export default NaverMapWithSearch;
