import React from 'react';
import styles from './Profile.module.scss';

const Profile = ({ customerMyPageDto, stats }) => {
    return (
        <div className={styles.profileSection}>
            <div className={styles.profile}>
                <a className={styles.imgBox} href="#">
                    <img src={customerMyPageDto.profileImage || '/assets/img/defaultImage.jpg'} alt="Customer profile image"/>
                </a>
                <h2>{customerMyPageDto.nickname}</h2>
                <p>{customerMyPageDto.customerId}</p>
                <ul className={styles.nav}>
                    <li className={styles.navItem}><a className={styles.navLink} href="/customer/mypage">마이페이지</a></li>
                    <li className={styles.navItem}><a className={styles.navLink} href="/customer/mypage-edit">개인정보수정</a></li>
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