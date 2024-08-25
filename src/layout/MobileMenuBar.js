import React from 'react';
import styles from './MobileMenuBar.module.scss';
import { FaHome, FaClipboardList, FaUserCircle, FaComments } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // useNavigate import

const MobileMenuBar = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    return (
        <div className={styles.mobileMenuBar}>
            <div className={styles.menuItem} onClick={() => navigate('/main')}>
                <FaHome size={24} />
                <span>홈</span>
            </div>
            <div className={styles.menuItem} onClick={() => navigate('/customer')}>
                <FaClipboardList size={24} />
                <span>주문내역</span>
            </div>
            <div className={styles.menuItem} onClick={() => navigate('/customer')}>
                <FaUserCircle size={24} />
                <span>마이페이지</span>
            </div>
            <div className={styles.menuItem} onClick={() => navigate('/reviewCommunity')}>
                <FaComments size={24} />
                <span>커뮤니티</span>
            </div>
        </div>
    );
};

export default MobileMenuBar;
