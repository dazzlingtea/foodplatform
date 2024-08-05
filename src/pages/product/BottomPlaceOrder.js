import React from 'react';
import styles from "./BottomPlaceOrder.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const BottomPlaceOrder = ({ makeReservation, productDetail, initialCount, handleIncrease, handleDecrease, remainProduct }) => {

    // 디폴트 값 설정: productDetail 및 storeInfo가 없을 경우를 대비
    const storeInfo = productDetail?.storeInfo || {};
    const isReservation = remainProduct === 1; // 예약 가능 여부 판단

    const handleMakeReservation = () => {
        makeReservation(initialCount);
    };

    return (
        <div className={styles.bottomPlaceOrder}>
            <div className={styles.productAmtAdjustBtn}>
                <button
                    className={styles.adjustBtn}
                    onClick={handleDecrease}
                    disabled={initialCount <= 1}
                >
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                <p className={styles.initialCnt}>{initialCount}</p>
                <button
                    className={styles.adjustBtn}
                    onClick={handleIncrease}
                    disabled={initialCount >= remainProduct}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <div 
                className={`${styles.placeOrderBtn} ${isReservation ? styles.reservation : ''}`} 
                onClick={handleMakeReservation}
            >
                <p>{isReservation ? 'SOLD OUT' : '구매하기'}</p>
            </div>
        </div>
    );
};

export default BottomPlaceOrder;
