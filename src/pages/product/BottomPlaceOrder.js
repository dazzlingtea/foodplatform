import React from 'react';
import styles from './BottomPlaceOrder.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import ReservationBtn from "../../components/payment/ReservationBtn";

const BottomPlaceOrder = ({ productDetail, initialCount, handleIncrease, handleDecrease, remainProduct, closeModal, cntHandler }) => {
  const storeId = productDetail.storeInfo?.storeId || '';

  const isReservation = remainProduct === 1;

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
      <ReservationBtn tar={{remainProduct, initialCount, productDetail, cntHandler}}/>
    </div>
  );
};

export default BottomPlaceOrder;
