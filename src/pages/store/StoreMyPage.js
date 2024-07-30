import React, { useEffect, useState } from 'react';
import Profile from '../../components/store/mypage/Profile';
import styles from './StoreMyPage.module.scss';
import ReservationList from "../../components/store/mypage/ReservationList";
import ProductCount from "../../components/store/mypage/ProductCount";
import Calendar from "../../components/store/mypage/Calendar";
import { useModal } from '../common/ModalProvider';
import SideBarBtn from "../../components/store/mypage-edit/SideBarBtn";

const BASE_URL = window.location.origin;

const StoreMyPage = () => {
    const { openModal } = useModal();
    const [width, setWidth] = useState(window.innerWidth);
    const [show, setShow] = useState(false);
    const [storeInfo, setStoreInfo] = useState({});
    const [stats, setStats] = useState({});
    const [reservations, setReservations] = useState([]);

    /**
     * 현재 창의 너비를 설정하는 함수
     */
    const setInnerWidth = () => {
        setWidth(window.innerWidth);
    }

    /**
     * 가게 정보를 가져오는 함수
     */
    const fetchStoreInfo = async () => {
        try {
            const response = await fetch(`${BASE_URL}/store/info`);
            if (!response.ok) {
                throw new Error('Failed to fetch store info');
            }
            const data = await response.json();
            setStoreInfo(data);
        } catch (error) {
            console.error('Error fetching store info:', error);
        }
    };

    /**
     * 가게 통계 정보를 가져오는 함수
     */
    const fetchStats = async () => {
        try {
            const response = await fetch(`${BASE_URL}/store/stats`);
            if (!response.ok) {
                throw new Error('Failed to fetch stats');
            }
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    /**
     * 예약 목록을 가져오는 함수
     */
    const fetchReservations = async () => {
        try {
            const response = await fetch(`${BASE_URL}/store/reservations`);
            if (!response.ok) {
                throw new Error('Failed to fetch reservations');
            }
            const data = await response.json();
            setReservations(data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    /**
     * 화면 크기 변경 이벤트를 설정하는 useEffect 훅
     */
    useEffect(() => {
        window.addEventListener("resize", setInnerWidth);
        return () => {
            window.removeEventListener("resize", setInnerWidth);
        }
    }, []);

    /**
     * 가게 정보, 통계 정보, 예약 목록을 가져오는 useEffect 훅
     */
    useEffect(() => {
        fetchStoreInfo();
        fetchStats();
        fetchReservations();
    }, []);

    /**
     * 사이드바를 표시하거나 숨기는 함수
     */
    const showHandler = () => {
        setShow(prev => !prev);
    }

    return (
        <>
            {width <= 400 && <SideBarBtn onShow={showHandler} />}
            <div className={styles.myPageArea}>
                <div className={styles.container}>
                    <Profile
                        storeInfo={storeInfo}
                        stats={stats}
                        isShow={show}
                    />
                    <div className={styles.content}>
                        <ReservationList reservations={reservations} />
                        <ProductCount />
                        <Calendar />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StoreMyPage;