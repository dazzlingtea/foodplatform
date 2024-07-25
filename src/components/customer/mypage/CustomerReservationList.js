import React, {useState, useEffect} from 'react';
import styles from './CustomerReservationList.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCircleCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../../pages/common/ModalProvider"

const BASE_URL = window.location.origin;

const CustomerReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const { openModal } = useModal();

    useEffect(() => {
        // fetchReservations(); // 실제 API 호출
        setDummyReservations(); // 더미 데이터 설정
    }, []);

    // 더미 데이터를 설정하는 함수
    const setDummyReservations = () => {
        const dummyData = [
            {
                reservationId: 1,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 1',
                status: 'RESERVED',
                pickupTimeF: '7월 19일 10시 00분',
                cancelReservationAtF: null,
                pickedUpAtF: null,
                price: 10000
            },
            {
                reservationId: 2,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 2',
                status: 'CANCELED',
                pickupTimeF: null,
                cancelReservationAtF: '7월 18일 12시 00분',
                pickedUpAtF: null,
                price: 20000
            },
            {
                reservationId: 3,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 3',
                status: 'NOSHOW',
                pickupTimeF: null,
                cancelReservationAtF: null,
                pickedUpAtF: '7월 17일 14시 00분',
                price: 30000
            },
            {
                reservationId: 4,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 4',
                status: 'RESERVED',
                pickupTimeF: '7월 20일 15시 30분',
                cancelReservationAtF: null,
                pickedUpAtF: null,
                price: 40000
            },
            {
                reservationId: 5,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 5',
                status: 'PICKEDUP',
                pickupTimeF: null,
                cancelReservationAtF: null,
                pickedUpAtF: '7월 19일 09시 00분',
                price: 50000
            },
            {
                reservationId: 6,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 6',
                status: 'CANCELED',
                pickupTimeF: null,
                cancelReservationAtF: '7월 17일 13시 15분',
                pickedUpAtF: null,
                price: 60000
            },
            {
                reservationId: 7,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 7',
                status: 'NOSHOW',
                pickupTimeF: null,
                cancelReservationAtF: null,
                pickedUpAtF: '7월 16일 11시 45분',
                price: 70000
            },
            {
                reservationId: 8,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 8',
                status: 'RESERVED',
                pickupTimeF: '7월 21일 14시 00분',
                cancelReservationAtF: null,
                pickedUpAtF: null,
                price: 80000
            },
            {
                reservationId: 9,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 9',
                status: 'PICKEDUP',
                pickupTimeF: null,
                cancelReservationAtF: null,
                pickedUpAtF: '7월 18일 10시 30분',
                price: 90000
            },
            {
                reservationId: 10,
                storeImg: '/assets/img/defaultImage.jpg',
                storeName: 'Dummy Store 10',
                status: 'CANCELED',
                pickupTimeF: null,
                cancelReservationAtF: '7월 15일 16시 20분',
                pickedUpAtF: null,
                price: 100000
            },
        ];
        setReservations(dummyData);
    };

    // 예약 상세내역을 가져오는 함수 (더미 데이터를 사용하므로 주석 처리)
    // const fetchReservationDetail = async (reservationId) => {
    //     try {
    //         const res = await fetch(`${BASE_URL}/reservation/detail/${reservationId}`);
    //         if (res.ok) {
    //             const data = await res.json();
    //             return data;
    //         } else {
    //             console.error('Failed to fetch reservation details');
    //             return null;
    //         }
    //     } catch (error) {
    //         console.error('Error fetching reservation detail:', error);
    //         return null;
    //     }
    // };

    // 예약 상세보기 모달을 여는 함수
    const handleReservationClick = async (reservationId) => {
        try {
            // const reservationDetail = await fetchReservationDetail(reservationId); // 실제 API 호출 주석 처리
            const reservationDetail = reservations.find(r => r.reservationId === reservationId); // 더미 데이터용 로직
            if (reservationDetail) {
                openModal('customerReservationDetail', { reservationDetail });
            } else {
                alert('Failed to fetch reservation details');
            }
        } catch (error) {
            console.error('Error fetching reservation detail:', error);
        }
    };

    // 예약 취소 fetch 함수
    const cancelReservation = async (reservationId) => {
        try {
            const response = await fetch(`${BASE_URL}/reservation/cancel/${reservationId}`, {
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
                reservation.reservationId === reservationId ? { ...reservation, status: 'CANCELED', cancelReservationAtF: new Date().toISOString() } : reservation
            );
            setReservations(updatedReservations);
            return true;
        } catch (error) {
            console.error('Error canceling reservation:', error);
            return false;
        }
    };

    // 예약 취소 모달을 여는 함수
    const handleCancelReservationClick = async (reservationId, event) => {
        event.stopPropagation(); // 이벤트 버블링 방지
        try {
            // const isCancelAllowed = true; // 더미 데이터에서는 항상 true, 실제 로직에서는 조건 확인 필요
            const reservationDetail = reservations.find(r => r.reservationId === reservationId); // 더미 데이터용 로직

            openModal('cancelReservationDetail', { reservationDetail, cancelReservation });
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

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollTop === 0) {
            e.preventDefault();
        } else if (scrollTop + clientHeight === scrollHeight) {
            e.preventDefault();
        }
    };

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