import React from 'react';
import styles from "./CustomerReservationDetailModal.module.scss";
import {useModal} from "../common/ModalProvider";
import {Link} from "react-router-dom";

const CustomerReservationDetailModal = ({reservationDetail, onPickupConfirm}) => {
    const {closeModal} = useModal();

    const handleConfirmPickUp = () => {
        onPickupConfirm(reservationDetail.id); // props로 받아온 함수 실행
        alert('픽업이 확인되었습니다. 감사합니다.');
        closeModal();
        // 추후 리뷰 기능 추가 가능
    };

    let tag = '';
    switch (reservationDetail.status) {
        case 'CANCELED':
            tag = (
                <>
                    <p>취소 시간:
                        <span>
                        {reservationDetail.cancelReservationAtF}
                        </span>
                    </p>
                </>
            );
            break;
        case 'RESERVED':
            tag = (
                <>
                    <p className={styles.pickupTimeF}>픽업 마감 시간:
                        <span>
                            {reservationDetail.pickupTimeF}
                        </span>
                    </p>
                </>
            );
            break;
        case 'PICKEDUP':
            tag = (
                <>
                    <p>픽업이 완료되었습니다.</p>
                    <p>픽업 시간:
                        <span>
                        {reservationDetail.pickedUpAtF}
                        </span>
                    </p>
                </>
            );
            break;
        case 'NOSHOW':
            tag = (
                <>
                    <p>픽업 마감 시간까지 픽업되지 않았습니다.</p>
                    <p>픽업 마감 시간:
                        <span>
                        {reservationDetail.pickupTimeF}
                    </span>
                    </p>
                </>
            )
            ;
            break;
        default:
            tag = <div>No information available.</div>;
            break;
    }


    return (
        <>
            <div className={styles.reservationDetailItem} data-reservation-id={reservationDetail.id}>
                <div className={styles.imgSection}>
                    <div>
                        <img className={styles.reservedProductImg} src={reservationDetail.productImg} alt="상품 이미지"/>
                    </div>
                    <img className={styles.reservedStoreImg} src={reservationDetail.storeImg} alt="가게 이미지"/>
                </div>
                <div className={styles.reservationTextInfo}>
                    <div>가게명:
                        <span>
                            {reservationDetail.storeName}
                        </span>
                    </div>
                    <div>가게 주소:
                        <a href="">
                            {reservationDetail.storeAddress}
                        </a>
                    </div>
                    {/* 추후 지도 API로 변경 가능 클릭 시 해당 주소 네이버 지도로 이동*/}
                    <div>예약한 시간:
                        <span>
                        {reservationDetail.reservationTimeF}
                        </span>
                    </div>
                    {tag}
                </div>
                {reservationDetail.status === 'RESERVED' ?
                    <>
                        <p className={styles.btnDes}>가게에 도착해 스페셜 팩을 수령했다면 <br/> '픽업 확인' 버튼을 눌러주세요!</p>
                        <button className={styles.pickupConfirmBtn} onClick={handleConfirmPickUp}>픽업 확인</button>
                    </>
            : <></>}

                <div className={styles.needHelp}>도움이 필요하신가요?</div>
                {/* 추후 추가될 기능 문의하기 버튼 */}
            </div>
        </>
    );
};

export default CustomerReservationDetailModal;