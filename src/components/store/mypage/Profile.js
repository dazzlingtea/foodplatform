import React, { useEffect } from 'react';
import styles from './Profile.module.scss';
import { Link, useLocation } from "react-router-dom";

const Profile = ({ storeInfo, stats, isShow }) => {
    const location = useLocation();

    useEffect(() => {
        if (isShow) document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isShow]);

    // 가게 정보를 가져오는 함수 (더미 데이터를 사용하므로 주석 처리)
    // const fetchStoreInfo = async () => {
    //     try {
    //         const response = await fetch(`${BASE_URL}/api/mypage/storeinfo`);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch store info');
    //         }
    //         const data = await response.json();
    //         setStoreData(data);
    //     } catch (error) {
    //         console.error('Error fetching store info:', error);
    //     }
    // };

    // 통계 정보를 가져오는 함수 (더미 데이터를 사용하므로 주석 처리)
    // const fetchStoreStats = async () => {
    //     try {
    //         const response = await fetch(`${BASE_URL}/api/mypage/statistics`);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch store stats');
    //         }
    //         const data = await response.json();
    //         setStoreStats(data);
    //     } catch (error) {
    //         console.error('Error fetching store stats:', error);
    //     }
    // };

    useEffect(() => {
        // fetchStoreInfo(); // 실제 API 호출
        // fetchStoreStats(); // 실제 API 호출
    }, []);

    const handleReload = (e) => {
        if (location.pathname === '/store') {
            e.preventDefault();
            window.location.reload();
        }
    };

    return (
    <div className={`${styles.profileSection} ${isShow ? styles.on : undefined}`}>
        <div className={styles.profile}>
            <a className={styles.imgBox} href="#" id="avatar">
                <img src={storeInfo.storeImg || '/assets/img/defaultImage.jpg'} alt="store image"/>
            </a>
            <h2>{storeInfo.storeName}</h2>
            <p>{storeInfo.storeId}</p>
            <ul className={styles.nav}>
                <Link to={'/store'} className={styles.navItem} onClick={handleReload}>마이페이지</Link>
                <Link to={'/store/edit'} className={styles.navItem}>개인정보수정</Link>
            </ul>
            <div className={styles.stats}>
                <div id="carbon" className={styles.statsBox}>
                    <img src="/assets/img/mypage-carbon.png" alt="leaf"/>
                    <div>{stats.coTwo}kg의 이산화탄소 배출을 줄였습니다</div>
                </div>
                <div id="community" className={styles.statsBox}>
                    <img src="/assets/img/mypage-community.png" alt="community"/>
                    <div>지금까지 {stats.customerCnt}명의 손님을 만났어요</div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Profile;