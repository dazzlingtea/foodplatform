import React, { useState } from 'react';
import styles from './ProductCount.module.scss';

const BASE_URL = window.location.origin;

const ProductCount = ({ openModal }) => {
    const [productData, setProductData] = useState({
        todayProductCnt: 10,
        todayPickedUpCnt: 5,
        readyToPickUpCnt: 2,
        remainCnt: 3,
    });

    const handleProductUpdate = () => {
        openModal('addProductAmount', {
            addProductAmount: handleAddProductAmount
        });
    };

    // 랜덤박스를 추가하는 함수 (더미 데이터를 사용하므로 주석 처리)
    // const handleAddProductAmount = async (amount) => {
    //     try {
    //         const response = await fetch(`${BASE_URL}/api/product/add`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ amount })
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to add product amount');
    //         }

    //         const data = await response.json();
    //         setProductData((prevData) => ({
    //             ...prevData,
    //             todayProductCnt: prevData.todayProductCnt + amount,
    //             remainCnt: prevData.remainCnt + amount
    //         }));
    //     } catch (error) {
    //         console.error('Error adding product amount:', error);
    //     }
    // };

    // 각 자리에 들어갈 수량을 가져오는 함수 (더미 데이터를 사용하므로 주석 처리)
    // const fetchProductCount = async () => {
    //     try {
    //         const response = await fetch(`${BASE_URL}/api/product/count`);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch product count');
    //         }

    //         const data = await response.json();
    //         setProductData({
    //             todayProductCnt: data.todayProductCnt,
    //             todayPickedUpCnt: data.todayPickedUpCnt,
    //             readyToPickUpCnt: data.readyToPickUpCnt,
    //             remainCnt: data.remainCnt
    //         });
    //     } catch (error) {
    //         console.error('Error fetching product count:', error);
    //     }
    // };

    // 더미 데이터를 사용하는 함수
    const handleAddProductAmount = (amount) => {
        setProductData((prevData) => ({
            ...prevData,
            todayProductCnt: prevData.todayProductCnt + amount,
            remainCnt: prevData.remainCnt + amount
        }));
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