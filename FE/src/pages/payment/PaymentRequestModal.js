import React from 'react';
import styles from "./PaymentRequestModal.module.scss";
import {requestPayment, updateReservationFetch} from "../../components/payment/fetch-payment";
import {useModal} from "../common/ModalProvider";

const PaymentRequestModal = ({storeName, price, paymentId, onClose}) => {
    const {modalState: {isOpen}, closeModal, aModal} = useModal();
    const formattedPrice = Intl.NumberFormat().format(price);

    const clickHandler = async () => {
        const response = await requestPayment(storeName, price, paymentId);
        if (response.code === "FAILURE_TYPE_PG") {
            console.log(response);
            return
        }
        const updateRes = await updateReservationFetch(paymentId);
        const data = await updateRes.text();
        if (updateRes.ok) {
            alert("결제가 완료되었습니다!");
            closeModal();
        } else {
            alert("잠시 후 다시 이용해주세요");
            console.log(data)
        }
    }
    return (
        <div>
            <div>
                <p>바로 결제 하시겠습니까?</p>
            </div>
            <div className={styles["btn-wrapper"]}>
                <button className={styles["x-btn"]} onClick={onClose}>취소</button>
                <button className={styles["check-btn"]} onClick={clickHandler}>총 {formattedPrice}원 결제하기</button>
            </div>
        </div>
    );
};

export default PaymentRequestModal;