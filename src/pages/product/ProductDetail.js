import React from 'react';
import styles from './ProductDetailModal.module.scss';

const ProductDetail = () => (
    <div className={styles.productDetail}>
        <p>2. Product Details</p>
        <div className={styles.map}>
            <div className={styles.mapImg}>지도 들어갈 자리</div>
            <p>픽업 주소</p>
        </div>
        <div className={styles.sectionLine}></div>
        <div className={styles.pickUpTimeInfo}>
            <p>픽업 시간</p>
        </div>
        <div className={styles.sectionLine}></div>
        <div className={styles.productInfo}>
            <div className={styles.price}>
                <p>상품 가격</p>
                <p>5900</p>
            </div>
            <div className={styles.sectionLine}></div>
            <div className={styles.productDes}>
                <p>상품 설명</p>
                <p>가게가 뭘 파는 가게인지~ + 랜덤으로 들어갑니다</p>
            </div>
        </div>
    </div>
);

export default ProductDetail;
