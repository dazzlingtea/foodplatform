import React from 'react';
import styles from './BottomPlaceOrder.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { createReservation } from './ProductReservation';

const BottomPlaceOrder = ({ productDetail, initialCount, handleIncrease, handleDecrease, remainProduct, closeModal }) => {
  const storeId = productDetail.storeInfo?.storeId || '';
  const customerId = 'test@gmail.com';

  const handleMakeReservation = async () => {
    if (remainProduct <= 1) {
      alert('해당 상품은 품절되었습니다.');
      closeModal();
      return;
    }

    try {
      const response = await createReservation(customerId, storeId, initialCount);
      console.log('예약 처리 응답:', response);
      alert('예약이 완료되었습니다!');
      closeModal();
    } catch (error) {
      console.error('예약 처리 중 오류 발생:', error);
      alert('예약 처리 중 오류가 발생했습니다!');
      closeModal();
    }
  };

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
