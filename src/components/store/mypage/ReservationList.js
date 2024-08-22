import React, { useEffect, useRef, useState } from 'react';
import styles from './ReservationList.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCircleCheck, faSpinner, faSliders } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../../pages/common/ModalProvider";
import {imgErrorHandler} from "../../../utils/error";

const BASE_URL = window.location.origin;

const ReservationList = ({ reservations, onUpdateReservations, isLoading, loadMore, hasMore, width, initialFilters, onApplyFilters }) => {
    const { openModal } = useModal();
    const listRef = useRef();
    const [filters, setFilters] = useState(initialFilters || {});

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${month}월 ${day}일 ${hours}시 ${minutes}분`;
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

            // 예약 목록을 갱신
            const updatedReservations = reservations.map(reservation =>
                reservation.reservationId === reservationId ? { ...reservation, status: 'PICKEDUP', pickedUpAtF: formatDate(new Date()) } : reservation
            );
            onUpdateReservations(updatedReservations);
        } catch (error) {
            console.error('Error completing pickup:', error);
        }
    };

    /**
     * 예약 항목을 클릭했을 때의 핸들러
     */
    const handleReservationClick = async (reservation) => {
        try {
            openModal('storeReservationDetail', {
                reservationInfo: reservation,
                onPickupConfirm: () => completePickup(reservation.reservationId)
            });
        } catch (error) {
            console.error('Error opening modal:', error);
        }
    };

    /**
     * 스크롤 이벤트를 처리하는 useEffect 훅
     * 스크롤이 바닥에 도달하면 `loadMore` 호출
     */
    useEffect(() => {
        const handleScroll = () => {
            if (listRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = listRef.current;
                if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore && !isLoading) {
                    loadMore();
                }
            }
        };

        const listElement = listRef.current;
        if (listElement && width > 400) {
            listElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (listElement && width > 400) {
                listElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, [hasMore, isLoading, loadMore, width]);

    /**
     * 필터 모달을 여는 함수
     */
    const openFilterModal = () => {
        openModal('storeReservationFilter', {
            onApply: handleApplyFilters,
            initialFilters: filters
        });
    };

    /**
     * 필터를 적용했을 때의 핸들러
     */
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
                <FontAwesomeIcon icon={faSliders} className={styles.filter} onClick={openFilterModal} />
            </div>
            <div className={`${styles.infoWrapper}`} ref={listRef}>
                <ul className={styles.reservationList}>
                    {reservations.map((reservation, index) => (
                        <li
                            key={index}
                            className={`${styles.reservationItem} ${styles[reservation.status.toLowerCase()]}`}
                            data-reservation-status={reservation.status}
                            onClick={() => handleReservationClick(reservation)}
                        >
                            <div className={styles.item}>
                                <div className={styles.imgWrapper}>
                                    <div className={styles.imgBox}>
                                        {reservation.status === 'CANCELED' && <FontAwesomeIcon icon={faCircleXmark} className={styles.canceled} />}
                                        {reservation.status === 'NOSHOW' && <FontAwesomeIcon icon={faCircleXmark} className={styles.noshow} />}
                                        {reservation.status === 'RESERVED' && <FontAwesomeIcon icon={faSpinner} className={styles.loading} />}
                                        {reservation.status === 'PICKEDUP' && <FontAwesomeIcon icon={faCircleCheck} className={styles.done} />}
                                        <img src={reservation.profileImage} onError={imgErrorHandler} alt="profile Image" />
                                    </div>
                                </div>
                                <span className={styles.reservationNickname}>
                                    {reservation.nickname}님께서
                                </span>
                            </div>
                            <div className={styles.reservationStatus}>
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
                                        <span>픽업하러 오는 중이에요!</span>
                                        <span>{reservation.pickupTimeF}</span>
                                    </>
                                )}
                                {reservation.status === 'PICKEDUP' && (
                                    <>
                                        <span>픽업을 완료했어요</span>
                                        <span>{reservation.pickedUpAtF}</span>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                    {isLoading && <div className={styles.spinner}>Loading...</div>}
                </ul>
            </div>
        </div>
    );
};

export default ReservationList;