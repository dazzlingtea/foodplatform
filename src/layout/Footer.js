import React from 'react';
import styles from './Footer.module.scss'; // 푸터 스타일 임포트

const Footer = () => {
    // 푸터 관련 기능 추가
    return (
        <footer className={styles.footer}>
            {/* 푸터 내용 */}
            <p>Footer</p>
        </footer>
    );
};

export default Footer;