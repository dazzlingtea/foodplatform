import React, { useState, useEffect } from 'react';
import styles from './ProductCount.module.scss';
import { useModal } from "../../../pages/common/ModalProvider"

const BASE_URL = window.location.origin;

const ProductCount = () => {
    const [productData, setProductData] = useState({
        todayProductCnt: 0,
        todayPickedUpCnt: 0,
        readyToPickUpCnt: 0,
        remainCnt: 0,
    });
    const { openModal } = useModal();

    /**
     * 오늘의 랜덤박스 현황을 가져오는 함수
     */
    const fetchProductCount = async () => {
        try {
            const response = await fetch(`${BASE_URL}/store/getProductCount`);
            if (!response.ok) {
                throw new Error('Failed to fetch product count');
            }
            const data = await response.json();
            console.log('Fetched product count data:', data);  // 데이터 로그 추가
            setProductData({
                todayProductCnt: data.todayProductCnt,
                todayPickedUpCnt: data.todayPickedUpCnt,
                readyToPickUpCnt: data.readyToPickUpCnt,
                remainCnt: data.remainCnt
            });
        } catch (error) {
            console.error('Error fetching product count:', error);
        }
    };

    /**
     * 컴포넌트가 마운트될 때 오늘의 랜덤박스 현황을 가져옴
     */
    useEffect(() => {
        fetchProductCount();
    }, []);

    /**
     * 랜덤박스를 추가하는 함수
     * @param amount 추가할 랜덤박스의 개수
     */
    const handleAddProductAmount = async (amount) => {
        try {
            const response = await fetch(`${BASE_URL}/store/main/updateProductCnt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newCount: amount })
            });

            if (!response.ok) {
                throw new Error('Failed to add product amount');
            }

            setProductData((prevData) => ({
                ...prevData,
                todayProductCnt: prevData.todayProductCnt + amount,
                remainCnt: prevData.remainCnt + amount
            }));
        } catch (error) {
            console.error('Error adding product amount:', error);
        }
    };

    /**
     * 랜덤박스 추가 모달을 여는 함수
     */
    const handleProductUpdate = () => {
        openModal('addProductAmount', {
            addProductAmount: handleAddProductAmount,
            remainCnt: productData.remainCnt
        });
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