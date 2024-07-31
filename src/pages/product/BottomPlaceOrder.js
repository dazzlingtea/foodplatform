import React from 'react';
import styles from "./BottomPlaceOrder.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const BottomPlaceOrder = ({ makeReservation, productDetail, initialCount, handleIncrease, handleDecrease }) => {

    // 디폴트 값 설정: productDetail 및 storeInfo가 없을 경우를 대비
    const storeInfo = productDetail?.storeInfo || {};
    const remainProduct = storeInfo.remainProduct || 0;

    const handleMakeReservation = () => {
        console.log(initialCount);
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
            <div className={styles.placeOrderBtn} onClick={handleMakeReservation}>
                <p>구매하기</p>
            </div>
        </div>
    );
};

export default BottomPlaceOrder;
