import React, {useState} from 'react';
import {useModal} from "../../pages/common/ModalProvider";
import PaymentRequestModal from "../../pages/payment/PaymentRequestModal";
import SubModalPortal from "../../pages/payment/SubModalPortal";
import styles from "../../pages/customer/CustomerReservationDetailModal.module.scss"
import {patchReservationFetch} from "./fetch-payment";

const ReservationBtn = ({ storeInfo }) => {
    const [isShow, setIsShow] = useState(false);
    const [paymentId, setPaymentId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { closeModal, openModal } = useModal();
    const storeId = storeInfo?.storeId || '';
    const price = storeInfo?.price;
    const handleMakeReservation = async () => {
        setIsLoading(true);
        const tarId = `${storeInfo.productId}-${Date.now()}`;
        setPaymentId(tarId);
        try {
            const response = await patchReservationFetch(tarId, storeInfo.reservationId);
            const data = await response.json();
            setIsLoading(false);
            if (response.ok && data) {
                setIsShow(true);
            } else {
                alert("결제 유효 시간이 지났습니다.");
                closeModal();
                window.location.reload();
            }
        } catch (e) {
            alert("잠시 후 다시 이용해주세요.");
            console.error(e);
            setIsLoading(false);
            setIsShow(false);
        }
    };

    const closeHandler = () => {
        setIsShow(false);
        closeModal();
    }
    return (
        <>
            <button className={styles.paymentBtn} onClick={handleMakeReservation}>결제하기</button>
            { isShow &&
                <SubModalPortal onClose={closeHandler} isLoading={isLoading}>
                    <PaymentRequestModal storeName={storeInfo.storeName} price={price} paymentId={paymentId} onClose={closeHandler}/>
                </SubModalPortal>
            }
        </>
    );
};

export default ReservationBtn;