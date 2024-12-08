// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { CUSTOMER_URL } from "../../../config/host-config";
// import { checkAuthToken } from '../../../utils/authUtil';
//
// function loadScript(src) {
//     return new Promise((resolve, reject) => {
//         const script = document.createElement('script');
//         script.src = src;
//         script.async = true;
//         script.onload = resolve;
//         script.onerror = reject;
//         document.head.appendChild(script);
//     });
// }
//
// const callMyLocation = async (token, refreshToken, navigate) => {
//     const response = await (`${CUSTOMER_URL}/myFavMap`, {
//         headers: {
//             'Authorization': 'Bearer ' + token,
//             'refreshToken': refreshToken,
//             'Content-Type': 'application/json'
//         },
//         method: 'POST',
//         body: JSON.stringify({ location: "nong---=-=-=-=-===--==-=" }) // location 문자열 전달
//     }, navigate);
//
//     if (response && response.location) {
//         console.log("Received data from myFavMap:", response);
//     }
// };
//
// const MyFavMap = () => {
//     const navigate = useNavigate();
//
//     useEffect(() => {
//
//         /**
//          * verifyAndLoadData 를 navigate와 함께 활용
//          * @returns 토큰 검증 결과
//          *  토큰이 유효할 경우 callMyLocation(페치하고싶은 function) 호출
//          */
//         const verifyAndLoadData = async () => {
//             const tokenData = await checkAuthToken(navigate);
//
//             if (tokenData) {
//                 const { token, refreshToken } = tokenData;
//
//                 // 토큰이 유효할 경우 callMyLocation 호출
//                 await callMyLocation(token, refreshToken, navigate);
//
//                 const ncpClientId = process.env.REACT_APP_YOUR_CLIENT_ID;
//                 if (ncpClientId) {
//                     const scriptUrl = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ncpClientId}`;
//                     loadScript(scriptUrl)
//                         .then(() => {
//                             console.log('Naver Map script loaded successfully');
//
//                             if (navigator.geolocation) {
//                                 navigator.geolocation.getCurrentPosition(
//                                     (position) => {
//                                         const { latitude, longitude } = position.coords;
//
//                                         console.log(`Latitude (x): ${latitude}`);
//                                         console.log(`Longitude (y): ${longitude}`);
//
//                                         const mapOptions = {
//                                             center: new window.naver.maps.LatLng(latitude, longitude),
//                                             zoom: 15,
//                                         };
//
//                                         const map = new window.naver.maps.Map('map', mapOptions);
//                                         new window.naver.maps.Marker({
//                                             position: new window.naver.maps.LatLng(latitude, longitude),
//                                             map: map,
//                                         });
//                                     },
//                                     (error) => {
//                                         console.error('Error getting geolocation', error);
//                                     }
//                                 );
//                             } else {
//                                 console.error('Geolocation not supported');
//                             }
//                         })
//                         .catch((error) => {
//                             console.error('Failed to load Naver Map script', error);
//                         });
//                 } else {
//                     console.error('Client ID가 설정되지 않았습니다.');
//                 }
//             }
//         };
//
//         verifyAndLoadData();
//     }, [navigate]);
//
//     return <div id="map" style={{ width: '100%', height: '400px' }} />;
// };
//
// export default MyFavMap;