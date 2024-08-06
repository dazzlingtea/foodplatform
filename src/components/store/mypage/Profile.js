import React, { useEffect } from 'react';
import styles from './Profile.module.scss';
import { Link, useLocation } from "react-router-dom";
import { imgErrorHandler } from "../../../utils/error";
import ProductCount from "./ProductCount";
import Calendar from "./Calendar";
import { useModal } from "../../../pages/common/ModalProvider";

const BASE_URL = window.location.origin;

const Profile = ({ storeInfo, stats, isShow, width }) => {
    const location = useLocation();
    const { closeModal } = useModal();

    /**
     * 사이드바 표시 상태에 따라 스크롤 동작을 제어하는 useEffect 훅
     */
    useEffect(() => {
        if (isShow) document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isShow, closeModal]);

    /**
     * 현재 페이지가 '/store'일 때 새로고침하는 함수
     */
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
                    <img src={storeInfo.storeImg} onError={imgErrorHandler} alt="store image"/>
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
                {width <= 400 && (
                    <>
                        <ProductCount/>
                        <Calendar />
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;