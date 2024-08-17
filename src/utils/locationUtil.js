// locationUtils.js

export const initializeNaverMapsForHeader = () => {
    console.log("Naver Maps API 초기화 시작!");
    return new Promise((resolve, reject) => {
        if (window.naver && window.naver.maps) {
            console.log("Naver Maps API 이미 로드됨.");
            resolve();
        } else {
            console.log("Naver Maps API 로드 중...");
            const script = document.createElement('script');
            script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_YOUR_CLIENT_ID}&submodules=geocoder`;
            script.async = true;
            script.onload = () => {
                console.log("Naver Maps API 로드 완료.");
                resolve();
            };
            script.onerror = (error) => {
                console.error("Naver Maps API 로드 오류:", error);
                reject(error);
            };
            document.head.appendChild(script);
        }
    });
};

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        initializeNaverMapsForHeader()
            .then(() => {
                if (!window.naver || !window.naver.maps) {
                    console.error('Naver Maps API is not loaded.');
                    reject('Naver Maps API is not loaded.');
                    return;
                }

                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        resolve({ lat, lng });
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        reject(error);
                    }
                );
            })
            .catch((error) => {
                console.error('Naver Maps API 초기화 실패:', error);
                reject(error);
            });
    });
};

export const reverseGeocode = (lat, lng) => {
    return new Promise((resolve, reject) => {
        if (!window.naver || !window.naver.maps || !window.naver.maps.Service) {
            console.error('Naver Maps API is not loaded.');
            reject('Naver Maps API is not loaded.');
            return;
        }

        const coord = new window.naver.maps.LatLng(lat, lng);
        window.naver.maps.Service.reverseGeocode(
            {
                coords: coord,
                orders: ['addr'] // addr (도로명 주소), legalcode (법정동 코드)
            },
            (status, response) => {
                console.log('API 응답 데이터:', response.v2.address.jibunAddress); // 지번
                console.log('API 응답 데이터:', response.v2.address.roadAddress); // 도로명


                if (status !== window.naver.maps.Service.Status.OK) {
                    console.error('Reverse geocoding failed:', status);
                    reject(status);
                    return;
                }

                // 응답 데이터의 구조를 확인하여 적절한 필드를 사용
                if (response) {
                    // 주소를 직접 가져오도록 수정
                    const address = response.v2.address.jibunAddress;
                    console.log("address 가져온 것 ", address);
                    if (address) {
                        // address 객체를 JSON 문자열로 변환하여 세션 스토리지에 저장
                        sessionStorage.setItem('userAddress', JSON.stringify(address));

                        resolve(address);
                    } else {
                        console.error('주소가 없습니다.');
                        reject('주소가 없습니다.');
                    }
                } else {
                    console.error('응답 데이터에 주소가 없습니다.');
                    reject('응답 데이터에 주소가 없습니다.');
                }
            }
        );
    });
};