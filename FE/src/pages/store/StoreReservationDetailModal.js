import React from 'react';
import styles from './StoreReservationDetailModal.module.scss';
import { useModal } from "../common/ModalProvider";

const StoreReservationDetailModal = ({ reservationInfo, onPickupConfirm }) => {
    const { closeModal } = useModal();

    const handleConfirmPickUp = () => {
        if (typeof onPickupConfirm === 'function') {
            onPickupConfirm(reservationInfo.id);
            alert('픽업이 확인되었습니다. 감사합니다.');
            closeModal();
        } else {
            console.error('onPickupConfirm is not a function');
        }
    };

    if (!reservationInfo) {
        return null; // 예약 정보가 없을 경우 null 반환 (로딩 처리 등)
    }

    let tag = '';
    switch (reservationInfo.status) {
        case 'CANCELED':
            tag = (
                <div className={styles.reservationDetailItem} data-reservation-id={reservationInfo.id}>
                    <img src="/assets/img/cancel-stress.png" alt="취소 이미지" />
                    <p>예약이 취소되었습니다.</p>
                    <p>취소 시간: {reservationInfo.cancelReservationAtF}</p>
                </div>
            );
            break;
        case 'RESERVED':
            tag = (
                <div className={styles.reservationDetailItem} data-reservation-id={reservationInfo.id}>
                    <img src="/assets/img/caution2.png" alt="경고 이미지"/>
                    <p className={styles.caution}>픽업 닉네임을 확인 해주세요</p>
                    <p className={styles.pickupNickname}>닉네임: <span>{reservationInfo.nickname}</span></p>
                    <p className={styles.modalReservationStatus}>픽업 대기 중</p>
                    <p className={styles.pickupTime}>픽업 마감 시간: <span>{reservationInfo.pickupTimeF}</span></p>

                    <p className={styles.btnDes}>가게에 도착해 스페셜 팩을 수령했다면 <br/> '픽업 확인' 버튼을 눌러주세요!</p>
                    <button className={styles.pickupConfirmBtn} onClick={handleConfirmPickUp}>픽업 확인</button>
                </div>
            );
            break;
        case 'PICKEDUP':
            tag = (
                <div className={styles.reservationDetailItem} data-reservation-id={reservationInfo.id}>
                    <img src="/assets/img/pickedup-happy.png" alt="체크 이미지" />
                    <p>픽업 닉네임: <span style={{ fontFamily: 'jua', fontSize: '25px' }}>{reservationInfo.nickname}</span></p>
                    <p>픽업이 완료되었습니다.</p>
                    <p>픽업 시간: {reservationInfo.pickedUpAtF}</p>
                </div>
            );
            break;
        case 'NOSHOW':
            tag = (
                <div className={styles.reservationDetailItem} data-reservation-id={reservationInfo.id}>
                    <img src="/assets/img/noshow-sad.png" alt="노쇼 이미지" />
                    <p>픽업 마감 시간까지 픽업되지 않았습니다.</p>
                    <p>픽업 마감 시간: {reservationInfo.pickupTimeF}</p>
                </div>
            );
            break;
        default:
            tag = <div>No information available.</div>;
            break;
    }

    return (
        <div className={styles.modalWrapper}>
            {tag} {/* 예약 정보 태그 */}
        </div>
    );
};

export default StoreReservationDetailModal;
