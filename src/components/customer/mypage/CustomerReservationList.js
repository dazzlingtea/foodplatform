import React, { useState, useEffect } from 'react';
import styles from './CustomerReservationList.module.scss';

const BASE_URL = window.location.origin;

const CustomerReservationList = ({ customerId }) => {
    const [reservations, setReservations] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        fetchReservations();
        window.addEventListener('scroll', setupInfiniteScroll);
        return () => {
            window.removeEventListener('scroll', setupInfiniteScroll);
        };
    }, []);

    const fetchReservations = async () => {
        if (isFetching) return;
        setIsFetching(true);

        try {
            const res = await fetch(`${BASE_URL}/reservation/${customerId}`);
            const data = await res.json();
            setReservations(data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        } finally {
            setIsFetching(false);
        }
    };

    const setupInfiniteScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50 && !isFetching) {
            fetchReservations();
        }
    };

    const fetchCancelReservation = async (reservationId) => {
        try {
            const res = await fetch(`${BASE_URL}/reservation/${reservationId}/cancel`, { method: 'PATCH' });
            if (res.status === 200) {
                fetchReservations();
            } else {
                alert('취소에 실패했습니다!');
            }
        } catch (error) {
            console.error('Error cancelling reservation:', error);
        }
    };

    const fetchConfirmPickUp = async (reservationId) => {
        try {
            const res = await fetch(`${BASE_URL}/reservation/${reservationId}/pickup`, { method: 'PATCH' });
            if (res.status === 200) {
                fetchReservations();
            } else {
                alert('픽업 완료에 실패했습니다!');
            }
        } catch (error) {
            console.error('Error confirming pick up:', error);
        }
    };

    const handleCancelClick = async (reservationId) => {
        const isCancelAllowed = await fetchIsCancelAllowed(reservationId);
        if (!isCancelAllowed) {
            alert('예약 취소가 불가능합니다.');
            return;
        }

        if (window.confirm('정말로 예약을 취소하시겠습니까?')) {
            fetchCancelReservation(reservationId);
        }
    };

    const handlePickUpClick = async (reservationId) => {
        if (window.confirm('정말로 픽업을 완료하셨습니까?')) {
            fetchConfirmPickUp(reservationId);
        }
    };

    const fetchIsCancelAllowed = async (reservationId) => {
        try {
            const res = await fetch(`${BASE_URL}/reservation/${reservationId}/check/cancel`);
            if (res.status !== 200) {
                console.error('Error checking cancel allowed:', await res.text());
                return false;
            }
            return await res.json();
        } catch (error) {
            console.error('Error checking cancel allowed:', error);
            return false;
        }
    };

    return (
        <div className={styles.reservationListForm}>
            <div className={styles.title}>
                <h3 className={styles.titleText}>
                    <span>예약 내역</span>
                </h3>
            </div>
            <div className={`${styles.infoWrapper} ${styles.reservation}`}>
                <ul className={styles.reservationList}>
                    {reservations.length > 0 ? (
                        reservations.map((reservation, index) => (
                            <li key={index} className={`${styles.reservationItem} ${styles[reservation.status]}`} data-reservation-id={reservation.reservationId}>
                                <div className={styles.item}>
                                    <div className={styles.imgWrapper}>
                                        <div className={styles.imgBox}>
                                            <img src={reservation.storeImg || '/assets/img/defaultImage.jpg'} alt="Store Image" />
                                            {reservation.status === 'CANCELED' && <i className={`fa-solid fa-circle-xmark ${styles.canceled}`}></i>}
                                            {reservation.status === 'RESERVED' && <i className={`fa-solid fa-spinner ${styles.loading}`}></i>}
                                            {reservation.status === 'PICKEDUP' && <i className={`fa-solid fa-circle-check ${styles.done}`}></i>}
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
                                            <button className={`${styles.reservationCancelBtn} ${styles.calendarButton} ${styles.cancelRes}`} onClick={() => handleCancelClick(reservation.reservationId)}>예약 취소하기</button>
                                        </>
                                    )}
                                    {reservation.status === 'PICKEDUP' && (
                                        <>
                                            <span>픽업을 완료했어요</span>
                                            <span>{reservation.pickedUpAtF}</span>
                                            <button className={`${styles.pickedUpBtn} ${styles.calendarButton} ${styles.pickUpRes}`} onClick={() => handlePickUpClick(reservation.reservationId)}>픽업 확인</button>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>예약 내역이 없습니다.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default CustomerReservationList;