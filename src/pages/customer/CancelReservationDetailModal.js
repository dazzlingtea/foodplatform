import React from 'react';
/**
 * 소비자 마이페이지 창에서 예약 취소 버튼 누를 시 뜨는 모달
 * @param cancelInfo - storeName, price, cancellationFee
 * @param isCancelAllowed - 픽업 마감시간으로부터 1시간 이내인지 (취소수수료 해당 여부)
 * @param onConfirmCancel - 취소 공지 확인 후 예약 취소
 * @returns {Element}
 * @constructor
 */
const CancelReservationDetailModal = ({cancelInfo, isCancelAllowed, onConfirmCancel}) => {

    return (
        <>
            <div>
                예약 취소 모달
            </div>
            {isCancelAllowed ? (
                <div>
                    <p>정말 취소하시겠습니까?</p>
                    <p>{cancelInfo.storeName} 상품이 맞습니까?</p>
                    <p>{cancelInfo.price}는 자동 환불됩니다.</p>
                </div>
            ) : (
                <div>
                    <p style={{ textAlign: 'center' }}>
                        픽업시간 기준 1시간 이내로 예약 취소시 <br />
                        취소 수수료 50%가 부과됩니다. <br />
                        정말 취소하시겠습니까?
                    </p>
                    <p style={{ fontFamily: 'jua', fontSize: '23px' }}>
                        취소수수료 : {cancelInfo.cancellationFee}
                    </p>
                    <p>취소 수수료는 결제 금액에서 자동 차감됩니다.</p>
                </div>
            )}
            <button className="calendar-button" onClick={onConfirmCancel}>확인</button>
        </>
    );
};

export default CancelReservationDetailModal;