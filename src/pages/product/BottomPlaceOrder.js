import React, {useState} from 'react';
import styles from "./BottomPlaceOrder.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

const BottomPlaceOrder = () => {
    const [initialCount, setInitialCount] = useState(1);

    const handleIncrease = () => {
        setInitialCount(prevCount => prevCount + 1);
    };

    const handleDecrease = () => {
        if (initialCount > 1) {
            setInitialCount(prevCount => prevCount - 1);
        }
    };
    return (
        <div className={styles.bottomPlaceOrder}>
            <div className={styles.productAmtAdjustBtn}>
                <button className={styles.adjustBtn} onClick={handleDecrease} disabled={initialCount <= 1}>
                    <FontAwesomeIcon icon={faMinus}/>
                </button>
                <p className={styles.initialCnt}>{initialCount}</p>
                <button className={styles.adjustBtn} onClick={handleIncrease}>
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
            </div>
            <div className={styles.placeOrderBtn}>
                <p>Place Order</p>
            </div>
        </div>
    );
};

export default BottomPlaceOrder;