import React, { useState, useEffect, useRef } from 'react';
import styles from './CustomerReservationList.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCircleCheck, faSpinner, faSliders } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../../pages/common/ModalProvider";
import {imgErrorHandler} from "../../../utils/error";
import {authFetch} from "../../../utils/authUtil";

const BASE_URL = window.location.origin;

const CustomerReservationList = ({ reservations, onUpdateReservations, isLoading, loadMore, hasMore, initialFilters, onApplyFilters }) => {
    const { openModal } = useModal();
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 400);
    const [filters, setFilters] = useState(initialFilters || {}); // 필터 유지
    const listRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 400);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (listRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = listRef.current;
                if (scrollTop + clientHeight >= scrollHeight && hasMore) {
                    loadMore();
                }
            }
        };

        const currentListRef = listRef.current;
        if (currentListRef) {
            currentListRef.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (currentListRef) {
                currentListRef.removeEventListener('scroll', handleScroll);
            }
        };
    }, [loadMore, hasMore]);

    // 날짜를 0월 0일 0시 0분 형식으로 포맷팅하는 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${month}월 ${day}일 ${hours}시 ${minutes}분`;
    };

    // 예약 상세내역을 가져오는 함수
    const fetchReservationDetail = async (reservationId) => {
        try {
            const res = await fetch(`${BASE_URL}/reservation/${reservationId}/modal/detail`);
            if (res.ok) {
                const data = await res.json();
                return data;
            } else {
                console.error('Failed to fetch reservation details');
                return null;
            }
        } catch (error) {
            console.error('Error fetching reservation detail:', error);
            return null;
        }
    };

    // 예약 취소 fetch 함수
    const cancelReservation = async (reservationId) => {
        try {
            const response = await fetch(`${BASE_URL}/reservation/cancel?reservationId=${reservationId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('취소에 실패했습니다.');
            }

            // 예약 취소 성공 시 예약 목록 갱신
            const updatedReservations = reservations.map(reservation =>
                reservation.reservationId === reservationId ? { ...reservation, status: 'CANCELED', cancelReservationAtF: formatDate(new Date().toISOString()) } : reservation
            );
            onUpdateReservations(updatedReservations);
        } catch (error) {
            console.error('Error canceling reservation:', error);
        }
    };

    // 예약 픽업 fetch 함수
    const completePickup = async (reservationId) => {
        try {
            const response = await fetch(`${BASE_URL}/reservation/pickup?reservationId=${reservationId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('픽업에 실패했습니다.');
            }

            // 예약 픽업 성공 시 예약 목록 갱신
            const updatedReservations = reservations.map(reservation =>
                reservation.reservationId === reservationId ? { ...reservation, status: 'PICKEDUP', pickedUpAtF: formatDate(new Date().toISOString()) } : reservation
            );
            onUpdateReservations(updatedReservations);
        } catch (error) {
            console.error('Error completing pickup:', error);
        }
    };

    // 예약 상세보기 모달을 여는 함수
    const handleReservationClick = async (reservationId) => {
        try {
            const reservationDetail = await fetchReservationDetail(reservationId);
            if (reservationDetail) {
                openModal('customerReservationDetail', {
                    reservationDetail,
                    onPickupConfirm: async () => await completePickup(reservationId)
                });
            } else {
                alert('Failed to fetch reservation details');
            }
        } catch (error) {
            console.error('Error fetching reservation detail:', error);
        }
    };

    // 예약 취소 모달을 여는 함수
    const handleCancelReservationClick = async (reservationId, event) => {
        event.stopPropagation(); // 이벤트 버블링 방지
        try {
            const reservationDetail = reservations.find(r => r.reservationId === reservationId);

            openModal('cancelReservationDetail', {
                reservationDetail,
                onConfirm: async () => {
                    await cancelReservation(reservationId);
                }
            });
        } catch (error) {
            console.error('Error fetching cancel reservation detail:', error);
        }
    };

    // 리뷰 작성 모달을 여는 함수
    const handleWriteReviewClick = async (reservationId, event) => {
        event.stopPropagation(); // 이벤트 버블링 방지
        try {
            const reservationDetail = reservations.find(r => r.reservationId === reservationId);
            openModal('writeReview', {
                reservationDetail
                // 여기에 리뷰 작성과 관련된 추가 데이터를 전달할 수 있습니다.
            });
        } catch (error) {
            console.error('Error fetching reservation detail for review:', error);
        }
    };

    // 필터 모달을 여는 함수
    const openFilterModal = () => {
        openModal('customerReservationFilter', {
            onApply: handleApplyFilters,
            initialFilters: filters
        });
        console.log("filters: ", filters);
    };

    // 필터 적용 함수
    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
        onApplyFilters(newFilters);
    };

    return (
        <div className={styles.reservationListForm}>
            <div className={styles.title}>
                <h3 className={styles.titleText}>
                    <span>예약 내역</span>
                </h3>
                <FontAwesomeIcon icon={faSliders} className={styles.filter} onClick={openFilterModal}/>
            </div>
            <div className={styles.infoWrapper} ref={listRef}>
                <ul className={styles.reservationList}>
                    {reservations.length > 0 ? (
                        reservations.map((reservation, index) => (
                            <li
                                key={index}
                                className={`${styles.reservationItem} ${styles[reservation.status]}`}
                                data-reservation-id={reservation.reservationId}
                                onClick={() => handleReservationClick(reservation.reservationId)}
                            >
                                <div className={styles.item}>
                                    <div className={styles.imgWrapper}>
                                        <div className={styles.imgBox}>
                                            {reservation.status === 'CANCELED' &&
                                                <FontAwesomeIcon icon={faCircleXmark} className={styles.canceled}/>}
                                            {reservation.status === 'NOSHOW' &&
                                                <FontAwesomeIcon icon={faCircleXmark} className={styles.noshow}/>}
                                            {reservation.status === 'RESERVED' &&
                                                <FontAwesomeIcon icon={faSpinner} className={styles.loading}/>}
                                            {reservation.status === 'PICKEDUP' &&
                                                <FontAwesomeIcon icon={faCircleCheck} className={styles.done}/>}
                                            <img src={reservation.storeImg} onError={imgErrorHandler}
                                                 alt="Store Image"/>
                                        </div>
                                        <span>{reservation.storeName}</span>
                                    </div>
                                </div>
                                <div className={`${styles.item} ${styles.reservationStatus}`}>
                                    {reservation.status === 'CANCELED' && (
                                        <>
                                            <span>예약을 취소했어요</span>
                                            <span>{reservation.cancelReservationAtF}</span>
                                        </>
                                    )}
                                    {reservation.status === 'NOSHOW' && (
                                        <>
                                            <span>미방문하여 예약이 취소됐어요</span>
                                            <span>{reservation.pickupTimeF}</span>
                                        </>
                                    )}
                                    {reservation.status === 'RESERVED' && (
                                        <>
                                            <span>픽업하러 가는 중이에요!</span>
                                            <span>{reservation.pickupTimeF}까지</span>
                                            <button
                                                className={`${styles.reservationCancelBtn} ${styles.calendarButton} ${styles.cancelRes}`}
                                                onClick={(event) => handleCancelReservationClick(reservation.reservationId, event)}
                                            >
                                                {isMobileView ? '예약 취소' : '예약 취소하기'}
                                            </button>
                                        </>
                                    )}
                                    {reservation.status === 'PICKEDUP' && (
                                        <>
                                            <span>픽업을 완료했어요</span>
                                            <span>{reservation.pickedUpAtF}</span>
                                            <button
                                                className={`${styles.reviewBtn} ${styles.calendarButton} ${styles.writeReview}`}
                                                onClick={(event) => handleWriteReviewClick(reservation.reservationId, event)}
                                            >
                                                {isMobileView ? '리뷰 작성' : '리뷰 작성하기'}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>예약 내역이 없습니다.</li>
                    )}
                    {isLoading && <div className={styles.spinner}>Loading...</div>}
                </ul>
            </div>
        </div>
    );
};

export default CustomerReservationList;
