import React, { useEffect } from 'react';
import styles from './ReservationList.module.scss';

const ReservationList = ({ reservations }) => {
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

    return (
        <div className={styles.info}>
            <div className={styles.infoBox}>
                <div className={styles.title}>
                    <h3 className={styles.titleText}>
                        <span>예약 내역</span>
                    </h3>
                    <div className={`${styles.infoWrapper}`}>
                        <ul className={styles.reservationList}>
                            {reservations.map((reservation, index) => (
                                <li key={index} className={`${styles.reservationItem}`} data-reservation-status={reservation.status}>
                                    <div className={styles.item}>
                                        <div className={styles.imgWrapper}>
                                            <div className={styles.imgBox}>
                                                <img src={reservation.profileImage || "/assets/img/defaultImage.jpg"} alt="profile Image" />
                                            </div>
                                            {reservation.status === 'CANCELED' && <i className="fa-solid fa-circle-xmark canceled"></i>}
                                            {reservation.status === 'NOSHOW' && <i className="fa-solid fa-circle-xmark canceled"></i>}
                                            {reservation.status === 'RESERVED' && <i className="fa-solid fa-spinner loading"></i>}
                                            {reservation.status === 'PICKEDUP' && <i className="fa-solid fa-circle-check done"></i>}
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
            </div>
        </div>
    );
};

export default ReservationList;