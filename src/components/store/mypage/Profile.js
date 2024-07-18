import React from 'react';
import styles from './Profile.module.scss';

const Profile = ({ storeInfo, stats }) => (
    <div className={styles.profileSection}>
        <div className={styles.profile}>
            <a className={styles.imgBox} href="#" id="avatar">
                <img src={storeInfo.storeImg || '/assets/img/defaultImage.jpg'} alt="store image" />
            </a>
            <h2>{storeInfo.storeName}</h2>
            <p>{storeInfo.storeId}</p>
            <ul className={styles.nav}>
                <li className={styles.navItem}><a className={styles.navLink} href="/store/mypage/main">마이페이지</a></li>
                <li className={styles.navItem}><a className={styles.navLink} href="/store/mypage/edit/main">개인정보수정</a></li>
            </ul>
        </div>
        <div className={styles.stats}>
            <div id="carbon" className={styles.statsBox}>
                <img src="/assets/img/mypage-carbon.png" alt="leaf" />
                <div>{stats.coTwo}kg의 이산화탄소 배출을 줄였습니다</div>
            </div>
            <div id="community" className={styles.statsBox}>
                <img src="/assets/img/mypage-community.png" alt="community" />
                <div>지금까지 {stats.customerCnt}명의 손님을 만났어요</div>
            </div>
        </div>
    </div>
);

export default Profile;