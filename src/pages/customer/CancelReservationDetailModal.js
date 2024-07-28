import React from 'react';
import {useModal} from "../common/ModalProvider";
import styles from "./CancelReservationDetailModal.module.scss"
import {isNaN} from "lodash";

/**
 * 소비자 마이페이지 창에서 예약 취소 버튼 누를 시 뜨는 모달
 * @param cancelInfo - storeName, price, cancellationFee
 * @param isCancelAllowed - 픽업 마감시간으로부터 1시간 이내인지 (취소수수료 해당 여부)
 * @param onConfirmCancel - 취소 공지 확인 후 예약 취소
 * @returns {Element}
 * @constructor
 */
const CancelReservationDetailModal = ({reservationDetail, cancelReservation}) => {
    const {closeModal} = useModal();

    let remainingTime = '';

    const handleReservationCancel = () => {
        // cancelReservation(reservationDetail.reservationId);
        alert('예약이 취소되었습니다.');
        closeModal();
    }


    const chargeCancelFee = (pickupTime) => {
        // 현재 시간을 가져옴
        const now = new Date();

        // 픽업 시간을 Date 객체로 변환
        const pickupDate = new Date(pickupTime);

        // 1시간 차이를 밀리초로 변환 (1시간 = 60 * 60 * 1000 ms)
        const ONE_HOUR = 60 * 60 * 1000;

        // 픽업 시간과 현재 시간의 차이를 밀리초로 계산
        const timeDifferenceMs = pickupDate - now;

        const timeDifferenceMinutes = Math.floor((timeDifferenceMs % ONE_HOUR) / (60 * 1000));

        remainingTime = `${timeDifferenceMinutes}분 남음`;

        console.log("픽업 시간:", pickupDate);
        console.log("현재 시간:", now);
        console.log("남은 시간:", remainingTime);
        console.log(isNaN(timeDifferenceMs))

        if(isNaN(timeDifferenceMs)){
            console.log("이미 지난 시간입니다.")
        }

        // 픽업 시간이 현재 시간으로부터 1시간 이상 남았는지 확인
        return timeDifferenceMs > ONE_HOUR && !isNaN(timeDifferenceMs);
    };

    const isCancelAllowed = chargeCancelFee(reservationDetail.pickupTime);

    console.log("취소 가능 여부:", isCancelAllowed);

    return (
        <div className={styles.cancelDetailInfo}>
            {isCancelAllowed ? (
                <div className={styles.withoutFee}>
                    <p>정말 취소하시겠어요?</p>
                    <p>{reservationDetail.storeName} 상품이 맞습니까?</p>

                </div>
            ) : (
                <div className={styles.withFee}>
                    <p className={styles.remainingTime}>픽업시간까지 남은 시간:
                        <span>
                            {remainingTime}
                        </span>
                    </p>
                    <p>
                        취소수수료 :
                        <span>
                            <span className={styles.cancelFee}>{reservationDetail.price * 0.5}</span>
                            <span>원</span>
                        </span>

                    </p>
                    <p className={styles.feeRule}>
                        픽업시간 기준 1시간 이내로 예약 취소시 <br/>
                        취소 수수료 50%가 부과됩니다. <br/>
                        정말 취소하시겠습니까?
                    </p>
                </div>
            )}
            <button className={styles.cancelConfirmBtn} onClick={handleReservationCancel}>네, 취소할래요</button>
            {isCancelAllowed ? <p className={styles.feeRule}>{reservationDetail.price} 원은 자동 환불됩니다.</p>
                : <p className={styles.feeRule}>취소 수수료는 환불 금액에서 자동 차감됩니다.</p>
            }
        </div>
    );
};

export default CancelReservationDetailModal;