import React, { useEffect } from 'react';
import styles from './ReservationList.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCircleCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";

const ReservationList = ({ reservations, openModal }) => {
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
    }, []);

    const handleReservationClick = (reservation) => {
        openModal('storeReservationDetail', { reservationInfo: reservation });
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
                                        <img src={reservation.profileImage || "/assets/img/defaultImage.jpg"} alt="profile Image" />
                                        {reservation.status === 'CANCELED' && <FontAwesomeIcon icon={faCircleXmark} className={`${styles.canceled} ${styles.icon}`} />}
                                        {reservation.status === 'NOSHOW' && <FontAwesomeIcon icon={faCircleXmark} className={`${styles.canceled} ${styles.icon}`} />}
                                        {reservation.status === 'RESERVED' && <FontAwesomeIcon icon={faSpinner} className={`${styles.loading} ${styles.icon}`} />}
                                        {reservation.status === 'PICKEDUP' && <FontAwesomeIcon icon={faCircleCheck} className={`${styles.done} ${styles.icon}`} />}
                                    </div>
                                </div>
                                <span className={styles.reservationNickname} style={{ fontSize: '18px' }}>
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