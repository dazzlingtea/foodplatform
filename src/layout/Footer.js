import React, { useEffect, useState } from 'react';
import styles from './Footer.module.scss';
import food1 from '../assets/footer-img/food1.jpg';
import food2 from '../assets/footer-img/food2.jpg';
import food3 from '../assets/footer-img/food3.jpg';
import imagination1 from '../assets/footer-img/imagination1.jpg';
import imagination2 from '../assets/footer-img/imagination2.jpg';
import nature1 from '../assets/footer-img/nature1.jpg';
import nature2 from '../assets/footer-img/nature2.jpg';

const images = [food1, food2, food3, imagination1, imagination2, nature1, nature2];

const Footer = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);


    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setIsFading(false);
            }, 1000); // 1초 후 이미지 전환
        }, 4000); // 4초마다 이미지 전환

        return () => clearInterval(intervalId);
    }, []);

    // 이메일 클립보드 복사
    const handleEmailClick = () => {
        navigator.clipboard.writeText("foodie.treee@gmail.com")
            .then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000); // 2초 후 복사 성공 메시지 초기화
            })
            .catch(err => console.error('Failed to copy text: ', err));
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.pictureDiv}>
                    <img
                        src={images[currentImageIndex]}
                        alt="Footer Image"
                        className={`${styles.footerImage} ${isFading ? styles.fadeOut : styles.fadeIn}`}
                    />
            </div>
            <span className={styles.emailTitle}>Based on Republic of Korea,</span>
            <span className={styles.email} onClick={handleEmailClick}>
                foodie.treee@gmail.com
            </span>
            {copySuccess && <span className={styles.copySuccess}>Copied!</span>}
            <span className={styles.copyRight}>©2024 FoodieTree All Rights Reserved.</span>

            <div className={styles.footerLinks}>
                <a className={styles.terms}> Terms of Service </a>
                <a className={styles.privacy}> Privacy Policy </a>
                <a className={styles.cookies}> Cookie Policy </a>
                <a className={styles.shareDate}> Do Not Sell or Share My Data </a>
                <a className={styles.foodWaste}> Food Waste Source </a>
                <a className={styles.contact}> Contact Us </a>
            </div>

            <div className={styles.logoDiv}>
                FOODIE TREE
            </div>

        </footer>
    );
};

export default Footer;