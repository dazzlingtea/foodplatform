import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import { Link, useLocation } from "react-router-dom";

const BASE_URL = window.location.origin;

const Profile = ({ customerMyPageDto, stats, isShow }) => {
    const location = useLocation();
    const [userData, setUserData] = useState({});
    const [userStats, setUserStats] = useState({});

    useEffect(() => {
        if (isShow) document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isShow]);

    // 사용자 정보를 가져오는 함수 (더미 데이터를 사용하므로 주석 처리)
    // const fetchUserInfo = async () => {
    //     try {
    //         const response = await fetch(`${BASE_URL}/api/mypage/userinfo`);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch user info');
    //         }
    //         const data = await response.json();
    //         setUserData(data);
    //     } catch (error) {
    //         console.error('Error fetching user info:', error);
    //     }
    // };

    // 통계 정보를 가져오는 함수 (더미 데이터를 사용하므로 주석 처리)
    // const fetchUserStats = async () => {
    //     try {
    //         const response = await fetch(`${BASE_URL}/api/mypage/statistics`);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch user stats');
    //         }
    //         const data = await response.json();
    //         setUserStats(data);
    //     } catch (error) {
    //         console.error('Error fetching user stats:', error);
    //     }
    // };

    useEffect(() => {
        // fetchUserInfo(); // 실제 API 호출
        // fetchUserStats(); // 실제 API 호출

        // 더미 데이터 설정
        setUserData({
            profileImage: '/assets/img/defaultImage.jpg',
            nickname: 'Dummy User',
            customerId: 'dummy1234',
        });

        setUserStats({
            coTwo: 150,
            money: 50000,
        });
    }, []);

    const handleReload = (e) => {
        if (location.pathname === '/customer') {
            e.preventDefault();
            window.location.reload();
        }
    };

    return (
        <div className={`${styles.profileSection} ${isShow ? styles.on : undefined}`}>
            <div className={styles.profile}>
                <a className={styles.imgBox} href="#">
                    <img src={userData.profileImage || '/assets/img/defaultImage.jpg'} alt="Customer profile image"/>
                </a>
                <h2>{userData.nickname}</h2>
                <p>{userData.customerId}</p>
                <ul className={styles.nav}>
                    {/*<Link to={'/customer'} className={styles.navItem} onClick={handleReload}>마이페이지</Link>*/}
                    <Link to={'/customer/edit'} className={styles.navItem} >개인정보수정</Link>
                </ul>
                <div className={styles.stats}>
                    <div id="carbon" className={styles.statsBox}>
                        <img src="/assets/img/mypage-carbon.png" alt="leaf"/>
                        <div>{userStats.coTwo}kg의 이산화탄소 배출을 줄였습니다</div>
                    </div>
                    <div id="community" className={styles.statsBox}>
                        <img src="/assets/img/mypage-pigbank.png" alt="community"/>
                        <div>지금까지 {userStats.money}원을 아꼈어요</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;