import React from 'react';
import styles from './ProductDetailModal.module.scss';

const StoreInfo = () => (
    <div className={styles.storeInfo}>
        <img className={styles.storeImg} src="" alt="storeImg" />
        <div className={styles.fromWhere}>
            <p className={styles.cart}>your cart from</p>
            <p className={styles.storeName}>가게 이름 &gt;</p> {/* 해당 가게 페이지로 이동 */}
        </div>
    </div>
);

export default StoreInfo;
