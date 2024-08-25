import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {DEFAULT_IMG, imgErrorHandler} from "../../../utils/error";
import PreferredArea from "./PreferredArea";
import PreferredFood from "./PreferredFood";
import FavoriteStore from "./FavoriteStore";
import { logoutAction } from "../../../utils/authUtil";

const Profile = ({ customerMyPageDto, stats, isShow, width }) => {
    const location = useLocation();
    const [userData, setUserData] = useState({});
    const [userStats, setUserStats] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (isShow) document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isShow]);

    useEffect(() => {
        setUserData(customerMyPageDto);
        setUserStats(stats);
    }, [customerMyPageDto, stats]);

    const handleReload = (e) => {
        if (location.pathname === '/customer') {
            e.preventDefault();
            window.location.reload();
        }
    };

    const handleLogout = async () => {
        await logoutAction(navigate);
        navigate('/sign-in');
    };

    const isMyPage = location.pathname === '/customer';

    return (
        <div className={`${styles.profileSection} ${isShow ? styles.on : ''}`}>
            <div className={styles.profile}>
                <a className={styles.imgBox} href="#">
                    <img src={userData.profileImage || DEFAULT_IMG} onError={imgErrorHandler} alt="Customer profile image" />
                </a>
                <h2>{userData.nickname}</h2>
                <p>{userData.customerId}</p>
                <ul className={styles.nav}>
                    <Link
                        to={'/customer'}
                        className={`${styles.navItem} ${isMyPage ? styles.active : ''}`}
                        onClick={isMyPage ? (e) => e.preventDefault() : handleReload}
                    >
                        마이페이지
                    </Link>
                    <Link to={'/customer/edit'} className={styles.navItem}>개인정보수정</Link>
                    <button className={styles.logoutButton} onClick={handleLogout}>로그아웃</button>
                </ul>
                <div className={styles.stats}>
                    <div id="carbon" className={styles.statsBox}>
                        <img src="/assets/img/mypage-carbon.png" alt="leaf" />
                        <div>{userStats.coTwo}kg의 이산화탄소 배출을 줄였습니다</div>
                    </div>
                    <div id="community" className={styles.statsBox}>
                        <img src="/assets/img/mypage-pigbank" alt="community" />
                        <div>지금까지 {userStats.money}원을 아꼈어요</div>
                    </div>
                </div>
                {width <= 400 && (
                    <>
                        <PreferredArea preferredAreas={userData.preferredArea} />
                        <PreferredFood preferredFoods={userData.preferredFood} />
                        <FavoriteStore favStores={userData.favStore} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;