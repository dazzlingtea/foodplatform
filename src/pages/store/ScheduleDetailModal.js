import React from 'react';
import { useModal } from "../common/ModalProvider";
import styles from './ScheduleDetailModal.module.scss';
import {now} from "lodash/date";

const ScheduleDetailModal = ({ scheduleDetail }) => {
    const { closeModal } = useModal(); // ModalProvider에서 closeModal 함수 가져오기
    // const { openTime, closeTime, totalProducts, soldProducts, isPast, isHoliday, handleSetHoliday, handleUndoHoliday } = scheduleDetail;

    // 테스트용 dummy data
    // const date = '2021-08-01';
    // const isHoliday = false;
    const formattedDate = scheduleDetail.date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const handleSetHoliday = () => {
        // scheduleDetail.handleSetHoliday();
        alert('휴무일로 지정되었습니다.');
        closeModal();
    }

    const handleUndoHoliday = () => {
        // scheduleDetail.handleUndoHoliday();
        alert('정상영업일로 변경되었습니다.');
        closeModal();
    }


    const today = scheduleDetail.date.toDateString() === new Date().toDateString();

    return (
        <div className={styles.scheduleDetailModal}>
            <div className={styles.modalHeader}>
                <h2>{formattedDate}</h2>
            </div>
            <div className={styles.modalBody}>
                <div className={styles.holidayInfo}>
                    {scheduleDetail.isHoliday ? (
                        <div>휴무일로 지정된 날짜입니다.</div>
                    ) : (
                        <>
                            <div className={styles.scheduleInfo}>
                                <div>오픈: {scheduleDetail.openTime}</div>
                                <div>픽업마감: {scheduleDetail.closeTime}</div>
                            </div>
                            <div className={styles.storeInfo}>
                                {scheduleDetail.isPast ? (
                                    <div>판매한 수량: {scheduleDetail.soldProducts}</div>
                                ) : (
                                    <div>업데이트 될 수량: {scheduleDetail.totalProducts}</div>
                                )}
                                {today && (<div>업데이트 된 수량: {scheduleDetail.totalProducts}</div>)}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.modalFooter}>
                {!scheduleDetail.isHoliday && !scheduleDetail.isPast && (
                    <button className={styles.holidaySetBtn} onClick={handleSetHoliday}>휴무일로 지정하기</button>
                )}
                {scheduleDetail.isHoliday && !scheduleDetail.isPast && (
                    <button className={styles.holidayUndoBtn} onClick={handleUndoHoliday}>휴무일 지정 취소</button>
                )}
                {/* <button className="action-button" onClick={handleSetPickupTime}>픽업 시간 수정 하기</button> */}
            </div>
        </div>
    );
};

export default ScheduleDetailModal;
