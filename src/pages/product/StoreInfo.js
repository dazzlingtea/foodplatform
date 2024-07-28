import React from 'react';
import styles from './ProductDetailModal.module.scss';

const StoreInfo = ({productDetail}) => (
    <div className={styles.storeInfo}>
        <img className={styles.storeImg} src={productDetail.storeInfo.storeImg} alt="storeImg" />
        <div className={styles.fromWhere}>
            {/*<p className={styles.cart}>your cart from</p>*/}
            <p className={styles.storeName}>{productDetail.storeInfo.storeName} &gt;</p> {/* 해당 가게 페이지로 이동 */}
        </div>
    </div>
);

export default StoreInfo;
