import React from 'react';
import styles from './ProductDetailModal.module.scss';
import {DEFAULT_IMG, imgErrorHandler} from "../../utils/error";

const StoreInfo = ({productDetail}) => (
    <div className={styles.storeInfo}>
        <img className={styles.productImg} src={productDetail.storeInfo.productImg || DEFAULT_IMG} alt="productImg" onError={imgErrorHandler}/>
        <img className={styles.storeImg} src={productDetail.storeInfo.productImg || DEFAULT_IMG} alt="storeImg" onError={imgErrorHandler}/>
        <div className={styles.fromWhere}>
            {/*<p className={styles.cart}>your cart from</p>*/}
            <p className={styles.storeName}>{productDetail.storeInfo.storeName}</p> {/* 해당 가게 페이지로 이동 */}
        </div>
    </div>
);

export default StoreInfo;
