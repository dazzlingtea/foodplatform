import React, { useEffect, useRef } from 'react';
import styles from './ReservationList.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCircleCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../../pages/common/ModalProvider";
import {imgErrorHandler} from "../../../utils/error";

const ReservationList = ({ reservations, isLoading, loadMore, hasMore, width }) => {
    const { openModal } = useModal();
    const listRef = useRef();

    const handleReservationClick = async (reservation) => {
        try {
            openModal('storeReservationDetail', { reservationInfo: reservation });
        } catch (error) {
            console.error('Error fetching reservation detail:', error);
        }
    };

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

    return (
        <div className={styles.reservationListForm}>
            <div className={styles.title}>
                <h3 className={styles.titleText}>
                    <span>예약 내역</span>
                </h3>
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