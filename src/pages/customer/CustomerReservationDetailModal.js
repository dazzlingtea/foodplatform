import React from 'react';

const CustomerReservationDetailModal = ({reservationDetail}) => {

    const confirmPickUp = async () => {
        // const response = await fetch(`${BASE_URL}`)
        alert('픽업 확인 후 특정 사유 없이 환불 불가 합니다.');
    };

    return (
        <>
        <div>
            예약 상세 조회 모달
        </div>
            <div>
                <div>예약자: {reservationDetail.nickname}</div>
                <div>예약시간: {reservationDetail.reservationTime}</div>
                {
                <button onClick={confirmPickUp}>픽업 확인</button>
                }
            </div>
        </>
    );
};

export default CustomerReservationDetailModal;