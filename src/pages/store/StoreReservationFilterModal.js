import React, { useState } from 'react';
import styles from './StoreReservationFilterModal.module.scss';
import { useModal } from "../common/ModalProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

const StoreReservationFilterModal = ({ onApply, initialFilters }) => {
    const { closeModal } = useModal();
    const [startDate, setStartDate] = useState(initialFilters?.dateRange?.startDate || '');
    const [endDate, setEndDate] = useState(initialFilters?.dateRange?.endDate || '');
    const [status, setStatus] = useState(initialFilters?.status || []);

    const handleStatusClick = (value) => {
        setStatus((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const getStatusDisplayName = (status) => {
        switch (status) {
            case 'RESERVED':
                return '진행 중';
            case 'PICKEDUP':
                return '픽업 완료';
            case 'CANCELED':
                return '취소';
            case 'NOSHOW':
                return '노쇼';
            default:
                return status;
        }
    };

    const handleApply = () => {
        onApply({ dateRange: { startDate, endDate }, status });
        closeModal();
    };

    const handleReset = () => {
        setStartDate('');
        setEndDate('');
        setStatus([]);
    };

    return (
        <div className={styles.modalContent}>
            <div className={styles.filterGroup}>
                <label>조회 기간</label>
                <div className={styles.dateRange}>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <span>~</span>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>
            <div className={styles.filterGroup}>
                <label>주문 상태</label>
                <div className={styles.options}>
                    {['RESERVED', 'PICKEDUP', 'CANCELED', 'NOSHOW'].map((item) => (
                        <div
                            key={item}
                            className={`${styles.option} ${status.includes(item) ? styles.selected : ''}`}
                            onClick={() => handleStatusClick(item)}
                        >
                            {getStatusDisplayName(item)}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.buttons}>
                <div className={styles.resetButton} onClick={handleReset}>
                    <FontAwesomeIcon icon={faRotateRight} className={styles.resetIcon}/>
                    <div className={styles.resetText}>초기화</div>
                </div>
                <button className={styles.applyButton} onClick={handleApply}>필터 적용하기</button>
            </div>
        </div>
    );
};

export default StoreReservationFilterModal;