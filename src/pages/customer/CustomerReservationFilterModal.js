import React, { useState, useEffect } from 'react';
import styles from './CustomerReservationFilterModal.module.scss';
import { useModal } from "../common/ModalProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

const CustomerReservationFilterModal = ({ onApply, initialFilters }) => {
    const { closeModal } = useModal();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(initialFilters?.category || []);
    const [startDate, setStartDate] = useState(initialFilters?.dateRange?.startDate || '');
    const [endDate, setEndDate] = useState(initialFilters?.dateRange?.endDate || '');
    const [status, setStatus] = useState(initialFilters?.status || []);

    // 컴포넌트가 마운트될 때 카테고리를 가져오는 함수 호출
    useEffect(() => {
        fetchCategories();
    }, []);

    // 백엔드에서 카테고리 데이터를 가져오는 비동기 함수
    const fetchCategories = async () => {
        try {
            const response = await fetch('/categories');
            const data = await response.json();
            setCategories(data); // 카테고리 목록 상태 업데이트
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    // 카테고리 클릭 시 호출되는 함수
    const handleCategoryClick = (value) => {
        setCategory((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    // 주문 상태 클릭 시 호출되는 함수
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

    // 필터 적용 버튼 클릭 시 호출되는 함수
    const handleApply = () => {
        onApply({ category, dateRange: { startDate, endDate }, status });
        closeModal();
    };

    // 초기화
    const handleReset = () => {
        setCategory([]);
        setStartDate('');
        setEndDate('');
        setStatus([]);
    };

    return (
        <div className={styles.modalContent}>
            {/*<div className={styles.header}>*/}
            {/*    <h2>필터</h2>*/}
            {/*</div>*/}
            <div className={styles.filterGroup}>
                <label>메뉴 종류(카테고리)</label>
                <div className={styles.options}>
                    {categories.map((item) => (
                        <div
                            key={item.foodName}
                            className={`${styles.option} ${category.includes(item.foodName) ? styles.selected : ''}`}
                            onClick={() => handleCategoryClick(item.foodName)}
                        >
                            {item.foodName}
                        </div>
                    ))}
                </div>
            </div>
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

export default CustomerReservationFilterModal;