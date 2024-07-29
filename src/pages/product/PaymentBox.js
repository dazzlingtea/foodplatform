import React from 'react';
import styles from './ProductDetailModal.module.scss';
import { faMinus, faPlus, faShoppingCart, faStar, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PaymentBox = ({ makeReservation, productDetail, initialCount, handleIncrease, handleDecrease }) => {
    const howMuchSaved = Math.floor(((productDetail.storeInfo.price / 0.3) - productDetail.storeInfo.price) * initialCount);
    const totalPrice = productDetail.storeInfo.price * initialCount;
    const originalPrice = Math.floor(productDetail.storeInfo.price / 0.3) * initialCount;

    const handleMakeReservation = () => {
        makeReservation(initialCount);
    };

    return (
        <section className={styles.paymentBox}>
            <div>
                <p className={styles.amountDesText}>구매하고자 하는 스페셜 팩의 수량을 알려주세요</p>
                <div className={styles.productAmtAdjustBtn}>
                    <button className={styles.adjustBtn} onClick={handleDecrease} disabled={initialCount <= 1}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <p className={styles.initialCnt}>{initialCount}</p>
                    <button className={styles.adjustBtn} onClick={handleIncrease} disabled={initialCount >= productDetail.storeInfo.remainProduct}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>

            <div className={styles.pay}>
                <p className={styles.saving}>
                    <FontAwesomeIcon icon={faStar} />
                    {howMuchSaved}원을 아끼고 있어요!
                </p>
                <div className={styles.reservationBtn} onClick={handleMakeReservation}>
                    <p>Place Order</p>
                    <p>{totalPrice}원</p>
                </div>
            </div>
            <div className={styles.orderSum}>
                <p>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span className={styles.orderAmount}>총 주문 수량</span>
                </p>
                <p>{initialCount} 개</p>
            </div>
            <div className={styles.sectionLine}></div>
            <div className={styles.promoCode}>
                <FontAwesomeIcon icon={faTag} />
                <p className={styles.promoText}>Promo codes, rewards & gift Cards</p>
            </div>
            <div className={styles.sectionLine}></div>
            <div className={styles.billSection}>
                <div className={styles.originPrice}>
                    <p>실제 판매 가격</p>
                    <p>{originalPrice}원</p>
                </div>
                <div className={styles.discount}>
                    <p>얼만큼 할인 되었는지</p>
                    <p>{howMuchSaved}원</p>
                </div>
                <div className={styles.sectionLine}></div>
                <div className={styles.totalBill}>
                    <p className={styles.totalPrice}>총액 </p>
                    <p className={styles.totalAmount}>{totalPrice}원</p>
                </div>
            </div>
        </section>
    );
};

export default PaymentBox;
