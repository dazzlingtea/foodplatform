import React from 'react';
import { useModal } from "../common/ModalProvider";
import styles from './ScheduleDetailModal.module.scss';

const ScheduleDetailModal = ({ clickedDateInfo }) => {
    const { closeModal } = useModal(); // ModalProvider에서 closeModal 함수 가져오기
    // const { clickedDate, isHoliday, storeInfo } = clickedDateInfo;

    // 테스트용 dummy data
    const clickedDate = '2021-08-01';
    const isHoliday = false;
    const storeInfo = { name: '가게 이름', address: '가게 주소' };

    const handleUndoHoliday = async () => {
        alert('휴무일 지정 취소하기');
        closeModal();

        // 휴무일 지정 취소 로직
        try {
            // API 호출 및 데이터 처리
            // closeModal() 호출 등
        } catch (error) {
            console.error('Error undoing holiday:', error);
            // 에러 처리 로직 추가
        }
    };

    const handleSetHoliday = async () => {
        alert('휴무일 지정하기');
        closeModal();
        // 휴무일로 지정하기 로직
        try {
            // API 호출 및 데이터 처리
            // closeModal() 호출 등
        } catch (error) {
            console.error('Error setting holiday:', error);
            // 에러 처리 로직 추가
        }
    };

    const handleSetPickupTime = async () => {
        alert('픽업시간 수정하기');
        closeModal();
        // 픽업 시간 설정하기 로직
        try {
            // API 호출 및 데이터 처리
        } catch (error) {
            console.error('Error setting pickup time:', error);
            // 에러 처리 로직 추가
        }
    };

    return (
        <div className={styles.scheduleDetailModal}>
            <div className={styles.modalHeader}>
                <h2>{clickedDate}</h2>
            </div>
            <div className={styles.modalBody}>
                <div className={styles.holidayInfo}>
                    {isHoliday ? (
                        <div>휴무일로 지정된 날짜입니다.</div>
                    ) : (
                        <div>정상 운영 날짜입니다.</div>
                    )}
                </div>
                <div className={styles.storeInfo}>
                    <h3>가게 정보</h3>
                    {/* storeInfo에 관련된 정보 표시 */}
                </div>
                <div className={styles.scheduleInfo}>
                    {/* 여기에 동적으로 변하는 일정 상세 정보를 표시 */}
                    <div>일정 상세 정보</div>
                </div>
            </div>
            <div className={styles.modalFooter}>
                {!isHoliday && (
                    <button className={styles.holidaySetBtn} onClick={handleSetHoliday}>휴무일로 지정하기</button>
                )}
                {isHoliday && (
                    <button className={styles.holidayUndoBtn} onClick={handleUndoHoliday}>휴무일 지정 취소하기</button>
                )}
                {/*<button className="action-button" onClick={handleSetPickupTime}>픽업 시간 수정 하기</button>*/}
            </div>
        </div>
    );
};

export default ScheduleDetailModal;
