import React, {useEffect} from 'react';
import styles from './Profile.module.scss';
import {Link} from "react-router-dom";

const Profile = ({ customerMyPageDto, stats, isShow }) => {

    useEffect(() => {
        if (isShow) document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isShow]);

    return (
        <div className={`${styles.profileSection} ${isShow ? styles.on : undefined}`}>
            <div className={styles.profile}>
                <a className={styles.imgBox} href="#">
                    <img src={customerMyPageDto.profileImage || '/assets/img/defaultImage.jpg'} alt="Customer profile image"/>
                </a>
                <h2>{customerMyPageDto.nickname}</h2>
                <p>{customerMyPageDto.customerId}</p>
                <ul className={styles.nav}>
                    <Link to={'/customer'} className={styles.navItem} >마이페이지</Link>
                    <Link to={'/customer/edit'} className={styles.navItem} >개인정보수정</Link>
                </ul>
                <div className={styles.stats}>
                    <div id="carbon" className={styles.statsBox}>
                        <img src="/assets/img/mypage-carbon.png" alt="leaf"/>
                        <div>{stats.coTwo}kg의 이산화탄소 배출을 줄였습니다</div>
                    </div>
                    <div id="community" className={styles.statsBox}>
                        <img src="/assets/img/mypage-pigbank.png" alt="community"/>
                        <div>지금까지 {stats.money}원을 아꼈어요</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;