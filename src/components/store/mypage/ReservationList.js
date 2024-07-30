import React, { useEffect, useState } from 'react';
import styles from './ReservationList.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCircleCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../../pages/common/ModalProvider"

const BASE_URL = window.location.origin;

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const { openModal } = useModal();

    /**
     * 예약 목록을 가져오는 함수
     */
    const fetchReservations = async () => {
        try {
            const response = await fetch(`${BASE_URL}/store/reservations`);
            if (!response.ok) {
                throw new Error('Failed to fetch reservations');
            }
            const data = await response.json();
            setReservations(data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    /**
     * 예약 아이템의 상태에 따라 스타일을 적용하는 useEffect 훅
     */
    useEffect(() => {
        fetchReservations();
    }, []);

    useEffect(() => {
        const reservationItems = document.querySelectorAll(`.${styles.reservationItem}`);
        reservationItems.forEach((item) => {
            const status = item.getAttribute('data-reservation-status');
            if (status === 'CANCELED') {
                item.classList.add(styles.canceled);
            } else if (status === 'RESERVED') {
                item.classList.add(styles.reserved);
            } else if (status === 'PICKEDUP') {
                item.classList.add(styles.pickedup);
            } else {
                item.classList.add(styles.noshow);
            }
        });
    }, [reservations]);

    /**
     * 예약 상세 정보를 모달로 표시하는 함수
     * @param reservation 예약 정보
     */
    const handleReservationClick = async (reservation) => {
        try {
            openModal('storeReservationDetail', { reservationInfo: reservation });
        } catch (error) {
            console.error('Error fetching reservation detail:', error);
        }
    };

    return (
        <div className={styles.reservationListForm}>
            <div className={styles.title}>
                <h3 className={styles.titleText}>
                    <span>예약 내역</span>
                </h3>
            </div>
            <div className={`${styles.infoWrapper}`}>
                <ul className={styles.reservationList}>
                    {reservations.map((reservation, index) => (
                        <li key={index} className={`${styles.reservationItem}`} data-reservation-status={reservation.status} onClick={() => handleReservationClick(reservation)}>
                            <div className={styles.item}>
                                <div className={styles.imgWrapper}>
                                    <div className={styles.imgBox}>
                                        {reservation.status === 'CANCELED' && <FontAwesomeIcon icon={faCircleXmark} className={styles.canceled} />}
                                        {reservation.status === 'NOSHOW' && <FontAwesomeIcon icon={faCircleXmark} className={styles.noshow} />}
                                        {reservation.status === 'RESERVED' && <FontAwesomeIcon icon={faSpinner} className={styles.loading} />}
                                        {reservation.status === 'PICKEDUP' && <FontAwesomeIcon icon={faCircleCheck} className={styles.done} />}
                                        <img src={reservation.profileImage || "/assets/img/defaultImage.jpg"} alt="profile Image" />
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
                </ul>
            </div>
        </div>
    );
};

export default ReservationList;