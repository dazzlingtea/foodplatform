import React, { useState, useEffect } from 'react';
import styles from './CustomerReservationList.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCircleCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";

const BASE_URL = window.location.origin;

const CustomerReservationList = ({ customerId, openModal }) => {
    const [reservations, setReservations] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        // fetchReservations(); // 실제 API 호출
        setDummyReservations(); // 더미 데이터 설정
        window.addEventListener('scroll', setupInfiniteScroll);
        return () => {
            window.removeEventListener('scroll', setupInfiniteScroll);
        };
    }, []);

    // 더미 데이터를 설정하는 함수
    const setDummyReservations = () => {
        const dummyData = [
            {
                reservationId: 1,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 1',
                status: 'RESERVED',
                pickupTimeF: '2024-07-19 10:00',
                cancelReservationAtF: null,
                pickedUpAtF: null,
            },
            {
                reservationId: 2,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 2',
                status: 'CANCELED',
                pickupTimeF: null,
                cancelReservationAtF: '2024-07-18 12:00',
                pickedUpAtF: null,
            },
            {
                reservationId: 3,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 3',
                status: 'NOSHOW',
                pickupTimeF: null,
                cancelReservationAtF: null,
                pickedUpAtF: '2024-07-17 14:00',
            },
            {
                reservationId: 1,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 1',
                status: 'RESERVED',
                pickupTimeF: '2024-07-19 10:00',
                cancelReservationAtF: null,
                pickedUpAtF: null,
            },
            {
                reservationId: 2,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 2',
                status: 'CANCELED',
                pickupTimeF: null,
                cancelReservationAtF: '2024-07-18 12:00',
                pickedUpAtF: null,
            },
            {
                reservationId: 3,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 3',
                status: 'PICKEDUP',
                pickupTimeF: null,
                cancelReservationAtF: null,
                pickedUpAtF: '2024-07-17 14:00',
            },
            {
                reservationId: 1,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 1',
                status: 'RESERVED',
                pickupTimeF: '2024-07-19 10:00',
                cancelReservationAtF: null,
                pickedUpAtF: null,
            },
            {
                reservationId: 2,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 2',
                status: 'CANCELED',
                pickupTimeF: null,
                cancelReservationAtF: '2024-07-18 12:00',
                pickedUpAtF: null,
            },
            {
                reservationId: 3,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 3',
                status: 'PICKEDUP',
                pickupTimeF: null,
                cancelReservationAtF: null,
                pickedUpAtF: '2024-07-17 14:00',
            },
            {
                reservationId: 1,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 1',
                status: 'RESERVED',
                pickupTimeF: '2024-07-19 10:00',
                cancelReservationAtF: null,
                pickedUpAtF: null,
            },
            {
                reservationId: 2,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 2',
                status: 'CANCELED',
                pickupTimeF: null,
                cancelReservationAtF: '2024-07-18 12:00',
                pickedUpAtF: null,
            },
            {
                reservationId: 3,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 3',
                status: 'PICKEDUP',
                pickupTimeF: null,
                cancelReservationAtF: null,
                pickedUpAtF: '2024-07-17 14:00',
            }
        ];
        setReservations(dummyData);
    };

    // 예약 목록을 가져오는 함수 (더미 데이터를 사용하므로 주석 처리)
    // const fetchReservations = async () => {
    //     if (isFetching) return;
    //     setIsFetching(true);

    //     try {
    //         const res= await fetch(`${BASE_URL}/reservation/${customerId}`);
    //         const data = await res.json();
    //         setReservations(data); // 예약 목록 상태 업데이트
    //     } catch (error) {
    //         console.error('Error fetching reservations:', error);
    //     } finally {
    //         setIsFetching(false);
    //     }
    // };

    // 무한 스크롤을 설정하는 함수
    const setupInfiniteScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50 && !isFetching) {
            setDummyReservations(); // 실제 API 호출 대신 더미 데이터 설정
            // fetchReservations();
        }
    };

    // 예약 상세보기 모달을 여는 함수
    const handleReservationClick = async (reservationId) => {
        try {
            // 더미 데이터용 로직 (실제 API 호출은 주석 처리)
            const reservationDetail = reservations.find(r => r.reservationId === reservationId);
            openModal('customerReservationDetail', { reservationDetail });
        } catch (error) {
            console.error('Error fetching reservation detail:', error);
        }
    };

    // 예약 취소 모달을 여는 함수
    const handleCancelReservationClick = async (reservationId) => {
        try {
            // 더미 데이터용 로직 (실제 API 호출은 주석 처리)
            const isCancelAllowed = true; // 더미 데이터에서는 항상 true
            if (!isCancelAllowed) {
                alert('예약 취소가 불가능합니다.');
                return;
            }
            openModal('cancelReservationDetail', { reservationId });
        } catch (error) {
            console.error('Error fetching cancel reservation detail:', error);
        }
    };

    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 400);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 400);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={styles.reservationListForm}>
            <div className={styles.title}>
                <h3 className={styles.titleText}>
                    <span>예약 내역</span>
                </h3>
            </div>
            <div className={styles.infoWrapper}>
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
                                            {reservation.status === 'CANCELED' && <FontAwesomeIcon icon={faCircleXmark} className={styles.canceled} />}
                                            {reservation.status === 'NOSHOW' && <FontAwesomeIcon icon={faCircleXmark} className={styles.noshow} />}
                                            {reservation.status === 'RESERVED' && <FontAwesomeIcon icon={faSpinner} className={styles.loading} />}
                                            {reservation.status === 'PICKEDUP' && <FontAwesomeIcon icon={faCircleCheck} className={styles.done} />}
                                            <img src={reservation.storeImg || '/assets/img/defaultImage.jpg'} alt="Store Image" />
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
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCancelReservationClick(reservation.reservationId); // 예약 취소 클릭 핸들러 호출
                                                }}
                                            >
                                                {isMobileView ? '예약 취소' : '예약 취소하기'}
                                            </button>
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