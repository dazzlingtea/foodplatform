import React from 'react';
import styles from './ProductDetailModal.module.scss';

const ProductDetail = ({productDetail}) => (<div className={styles.productDetail}>
    <p>스페셜팩 정보</p>
    <div className={styles.map}>
        <div className={styles.mapImg}>지도 들어갈 자리</div>
        <div className={styles.storeAddress}>
            <p>픽업 주소 </p>
            <p>{productDetail.storeInfo.storeAddress}</p>
        </div>

    </div>
    <div className={styles.sectionLine}></div>
    <div className={styles.pickUpTimeInfo}>
        <p>픽업 시간 </p>
        <p>{productDetail.storeInfo.pickUpTime}</p>
    </div>
    <div className={styles.sectionLine}></div>
    <div className={styles.productInfo}>
        <div className={styles.price}>
            <p>상품 가격</p>
            <p>{productDetail.storeInfo.price}</p>
        </div>
        <div className={styles.sectionLine}></div>
        <div className={styles.productDes}>
            <p>상품 설명</p>
            <p className={styles.productTextDesc}>{productDetail.storeInfo.desc}</p>
        </div>
    </div>
</div>);

export default ProductDetail;
