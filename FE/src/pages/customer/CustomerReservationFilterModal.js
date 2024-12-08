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

    // 카테고리 데이터를 가져오는 비동기 함수
    const fetchCategories = async () => {
        try {
            const response = await fetch('/categories');
            const data = await response.json();
            setCategories(data); // 카테고리 목록 상태 업데이트
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    // 컴포넌트가 마운트될 때 카테고리를 가져오는 함수 호출
    useEffect(() => {
        fetchCategories();
    }, []);

    // 카테고리 클릭 시 호출되는 함수
    const handleCategoryClick = (englishName) => {
        setCategory((prev) => {
            // 이미 선택된 카테고리라면 배열에서 제거, 그렇지 않으면 추가
            if (prev.includes(englishName)) {
                return prev.filter((item) => item !== englishName);
            } else {
                return [...prev, englishName];
            }
        });
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

    // 시작 날짜 변경 시 호출되는 함수
    const handleStartDateChange = (e) => {
        const selectedStartDate = e.target.value;
        if (endDate && new Date(selectedStartDate) > new Date(endDate)) {
            alert("시작 날짜는 종료 날짜 이후 일 수 없습니다.");
        } else {
            setStartDate(selectedStartDate);
        }
    };

    // 종료 날짜 변경 시 호출되는 함수
    const handleEndDateChange = (e) => {
        const selectedEndDate = e.target.value;
        if (startDate && new Date(selectedEndDate) < new Date(startDate)) {
            alert("종료 날짜는 시작 날짜 이전 일 수 없습니다.");
        } else {
            setEndDate(selectedEndDate);
        }
    };

    // 필터 적용 버튼 클릭 시 호출되는 함수
    const handleApply = () => {
        onApply({ category, dateRange: { startDate, endDate }, status });
        closeModal();
    };

    // 필터 초기화 함수
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
                    {categories.map(item => (
                        <div
                            key={item.englishName}
                            className={`${styles.option} ${category.includes(item.englishName) ? styles.selected : ''}`}
                            onClick={() => handleCategoryClick(item.englishName)} // 필터링 영어
                        >
                            {item.foodType} {/* 표기는 한글 */}
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
                        onChange={handleStartDateChange}
                    />
                    <span>~</span>
                    <input
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </div>
            </div>
            <div className={styles.filterGroup}>
                <label>주문 상태</label>
                <div className={styles.options}>
                    {['RESERVED', 'PICKEDUP', 'CANCELED', 'NOSHOW'].map(item => (
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
                    <FontAwesomeIcon icon={faRotateRight} className={styles.resetIcon} />
                    <div className={styles.resetText}>초기화</div>
                </div>
                <button className={styles.applyButton} onClick={handleApply}>필터 적용하기</button>
            </div>
        </div>
    );
};

export default CustomerReservationFilterModal;
