import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {getToken, getRefreshToken, extractArea} from '../utils/authUtil';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBarBtn from "../components/store/mypage-edit/SideBarBtn";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import MyInfo from "../components/header/MyInfo";
import {getCurrentLocation, initializeNaverMapsForHeader, reverseGeocode} from "../utils/locationUtil";
import SidebarModal from "../components/header/SidebarModal";
import SearchInput from "../components/search/SearchInput";
import FavAreaSelector from "../components/mainPage/FavAreaSelector"
import {FaComments} from "react-icons/fa";

// 아이콘을 라이브러리에 추가
library.add(faMagnifyingGlass);

const Header = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [show, setShow] = useState(false); // 햄버거 버튼 상태 관리
    // const [width, setWidth] = useState(window.innerWidth);
    // 위치 가져오기
    const [address, setAddress] = useState('위치를 불러오는 중...'); // 기본 주소 상태 설정
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        // 로그인 한 사람 정보 가져오기
        if(getToken()) {
            setIsAuthenticated(true);
        } else setIsAuthenticated(false);

        console.log('Is authenticated:', isAuthenticated); // 상태 확인

        // 현재위치 가져오기
        const fetchLocationAndAddress = () => {
            getCurrentLocation()
                .then(({ lat, lng }) => reverseGeocode(lat, lng))
                .then(address => {
                    // 변환된 주소를 상태로 설정
                    setAddress(address);
                    console.log('userAddress', JSON.stringify(address));
                })
                .catch(error => {
                    console.error('위치 정보 또는 주소 변환 오류:', error);
                    setAddress('위치를 가져오는데 실패했습니다.');
                });
        };

        // 지도 API 초기화 후 위치와 주소 가져오기
        initializeNaverMapsForHeader()
            .then(fetchLocationAndAddress)
            .catch(error => {
                console.error('Naver Maps API 초기화 실패:', error);
                setAddress('지도 API 오류');
            });

        // 세션 스토리지에서 주소를 가져와서 상태를 설정
        const storedAddress = sessionStorage.getItem('userAddress');
        if (storedAddress) {
            setAddress(JSON.parse(storedAddress)); // 세션 스토리지에서 가져온 값을 JSON.parse로 변환
        }
    }, [isAuthenticated]);

    const toggleModal = () => {
        setModalVisible(prev => !prev);
    };

    const handleAreaSelect = (selectedArea) => {
        console.log('Selected Area:', selectedArea);
        // 이곳에 추가적인 로직을 구현할 수 있습니다
    };


    const handleClick = () => {
        navigate('/reviewCommunity');
    }

    let userArea = extractArea();
    const clickHandler = () => {
        navigate('/main');
    }

    return (
        <header className={styles.header}>
            {/* 로고 */}
            <div className={styles.logoBtn} onClick={clickHandler}></div>

            {/* 현재 위치 */}
            {/* <div className={styles.locationPinIcon}></div>
            <div className={styles.areaName}>{userArea}</div>
            <div className={styles.dot}>・</div>
            <div className={styles.selectedAreaCategory}>Now</div>
            <div className={styles.selectedAreaCategoryBtn}></div> */}

            <div className={styles.selectedAreaSection}>
                <FavAreaSelector onAreaSelect={handleAreaSelect}/>
            </div>

            {/* 상점 검색 칸 */}
            {/*로그인을 하지 않아도 검색칸은 보이되, 로그인이 필요한 서비스 안내하기*/}
            {
                getToken() &&
                <div className={styles.searchStoreSection}>
                    <button className={styles.magnifyClickBtn}>
                        <FontAwesomeIcon icon="magnifying-glass" className={styles.magnifyIcon}/>
                    </button>
                    <SearchInput/>
                </div>
            }

            {/*리뷰 커뮤니티 메인*/}
            <div className={styles.reviewMainIcon} onClick={handleClick}>
                <FaComments size={24}/>
                <div className={styles.comm}>커뮤니티</div>
            </div>



            {/* 로그인 및 회원가입 버튼 */}
            <div className={styles.loginBtnSection}>
                {isAuthenticated ? (
                    <MyInfo/>
                ) : (
                    <>
                        <button className={styles.signInBtn} onClick={() => navigate('/sign-in')}> Sign in</button>
                        <div className={styles.dot}>・</div>
                        <button className={styles.signUpBtn} onClick={() => navigate('/sign-up')}> Sign up</button>
                    </>
                )}
            </div>
            {/* 모달 */}
            {modalVisible && <SidebarModal onClose={toggleModal}/>}
        </header>
    );
}

export default Header;
