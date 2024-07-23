import React, { useState } from 'react';
import styles from './ProductCount.module.scss';

const ProductCount = ({ openModal }) => {
    const [productData, setProductData] = useState({
        todayProductCnt: 10,
        todayPickedUpCnt: 5,
        readyToPickUpCnt: 2,
        remainCnt: 3,
    });

    const handleProductUpdate = () => {
        openModal('addProductAmount', {});
    };

    return (
        <div id="product-count" className={styles.productCount}>
            <div className={styles.title}>
                <h3 className={styles.titleText}>
                    <span id="randombox-stock">오늘의 랜덤박스 현황</span>
                    <button id="product-update-btn" className={styles.productUpdateBtn} onClick={handleProductUpdate}>추가</button>
                </h3>
                <div className={styles.productCountWrapper}>
                    <section id="product-count-status-with-img" className={styles.productCountStatusWithImg}>
                        <div className={styles.statusImg}>
                            <img src="/assets/img/mypage-foods.png" alt="픽업이미지" />
                            <div id="count">{productData.todayProductCnt}개 등록되었어요</div>
                        </div>
                        <div className={styles.statusImg}>
                            <img src="/assets/img/mypage-pickedUp.png" alt="픽업이미지" />
                            <div id="today-picked-up">{productData.todayPickedUpCnt}개 픽업완료</div>
                        </div>
                        <div className={styles.statusImg}>
                            <img src="/assets/img/mypage-omw.png" alt="픽업이미지" />
                            <div id="today-ready-picked-up">{productData.readyToPickUpCnt}개 픽업하러 오는 중</div>
                        </div>
                        <div className={styles.statusImg}>
                            <img src="/assets/img/free-icon-in-stock.png" alt="픽업이미지" />
                            <div id="remain">
                                {productData.remainCnt === 0 ? '남은 랜덤박스가 없어요' : `${productData.remainCnt}개 예약 기다리는 중`}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProductCount;