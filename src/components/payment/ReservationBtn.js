import React from 'react';
import styles from "../../pages/product/BottomPlaceOrder.module.scss";
import {authFetch} from "../../utils/authUtil";
import {useModal} from "../../pages/common/ModalProvider";
import * as PortOne from "@portone/browser-sdk/v2";

const ReservationBtn = ({ tar : {remainProduct, productDetail, initialCount }}) => {
    const { closeModal } = useModal();
    const isReservation = remainProduct === 1;
    const storeId = productDetail.storeInfo?.storeId || '';
    const handleMakeReservation = async () => {
        if (remainProduct <= 1) {
            alert('해당 상품은 품절되었습니다.');
            return;
        }

        const BASE_URL = window.location.hostname;
        const response = await PortOne.requestPayment({
            // Store ID 설정
            storeId: process.env.REACT_APP_PAYMENT_STORE_ID,
            // 채널 키 설정
            channelKey: process.env.REACT_APP_KAKAOPAY_CHANNEL_KEY,
            paymentId: `payment-${crypto.randomUUID()}`,
            orderName: `${productDetail.storeInfo.storeName}의 스페셜팩!`,
            totalAmount: `${productDetail.storeInfo.price * initialCount || 3900}`,
            currency: "CURRENCY_KRW",
            payMethod: "EASY_PAY",
            redirectUrl: `http://${BASE_URL}:3000/main`,
            bypass: {
                kakaopay: {
                    custom_message: "지구를 지키는 'FoodieTree'입니다"
                }
            }
        });

        console.log(response);
        const paymentId = response.paymentId;

        try {
            const response = await authFetch(`/reservation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    storeId: storeId,
                    cnt: `${initialCount}`,
                    storeName: productDetail.storeInfo.storeName,
                    paymentId
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error(errorData);
            }
            console.log('예약 처리 응답:', response);
            alert('예약이 완료되었습니다!');
            closeModal();
        } catch (error) {
            console.error('예약 처리 중 오류 발생:', error);
            alert('예약 처리 중 오류가 발생했습니다!');
        }
    };
    return (
        <div
            className={`${styles.placeOrderBtn} ${isReservation ? styles.reservation : ''}`}
            onClick={handleMakeReservation}
        >
            <p>{isReservation ? 'SOLD OUT' : '구매하기'}</p>
        </div>
    );
};

export default ReservationBtn;