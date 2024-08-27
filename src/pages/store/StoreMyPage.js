import React, { useEffect, useState } from 'react';
import Profile from '../../components/store/mypage/Profile';
import styles from './StoreMyPage.module.scss';
import ReservationList from "../../components/store/mypage/ReservationList";
import ProductCount from "../../components/store/mypage/ProductCount";
import Calendar from "../../components/store/mypage/Calendar";
import { useModal } from '../common/ModalProvider';
import SideBarBtn from "../../components/store/mypage-edit/SideBarBtn";
import {authFetch} from "../../utils/authUtil";
import {useNavigate} from "react-router-dom";
import {checkAuthToken} from "../../utils/authUtil";
import {BACK_HOST, STORE_URL} from "../../config/host-config";

const BASE_URL = window.location.origin;

const StoreMyPage = () => {
    const { openModal } = useModal();
    const [width, setWidth] = useState(window.innerWidth); // 현재 창 너비 설정
    const [show, setShow] = useState(false); // 모바일 반응형에서 사이드바 표시 여부 설정
    const [storeInfo, setStoreInfo] = useState({}); // 가게 정보 저장
    const [stats, setStats] = useState({}); // 가게 통계 정보 저장
    const [reservations, setReservations] = useState([]); // 전체 예약 목록 저장
    const [filteredReservations, setFilteredReservations] = useState([]); // 필터링된 예약 목록 저장
    const [displayReservations, setDisplayReservations] = useState([]); // 화면에 표시할 예약 목록 (무한스크롤)
    const [hasMore, setHasMore] = useState(true); // 추가 예약 목록이 있는지 여부 확인 (무한스크롤)
    const [startIndex, setStartIndex] = useState(0); // 무한 스크롤 작동 시 현재 불러온 데이터의 끝 인덱스 추적
    const [isLoading, setIsLoading] = useState(false); // 데이터를 불러오는 중인지 여부를 추적 (로딩 상태)
    const [filters, setFilters] = useState({}); // 필터 상태 저장
    const [isFiltered, setIsFiltered] = useState(false); // 필터 적용 상태를 나타내는 값
    const ITEMS_PER_PAGE = 10; // 한번에 가져올 예약목록 개수 설정

    /**
     * 현재 창의 너비를 설정하는 함수
     */
    const setInnerWidth = () => {
        setWidth(window.innerWidth);
    };

    /**
     * 가게 정보를 가져오는 함수
     */
    const fetchStoreInfo = async () => {
        try {
            const response = await authFetch(`${BACK_HOST}/store/info`);
            if (!response.ok) {
                throw new Error('Failed to fetch store info');
            }
            const data = await response.json();
            setStoreInfo(data);
        } catch (error) {
            console.error('Error fetching store info:', error);
        }
    };

    /**
     * 가게 통계 정보를 가져오는 함수
     */
    const fetchStats = async () => {
        try {
            const response = await authFetch(`${BACK_HOST}/store/stats`);
            if (!response.ok) {
                throw new Error('Failed to fetch stats');
            }
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    /**
     * 예약 목록을 가져오는 함수
     */
    const fetchReservations = async () => {
        try {
            const response = await authFetch(`${STORE_URL}/reservations`);
            if (!response.ok) {
                throw new Error('Failed to fetch reservations');
            }
            const data = await response.json();
            const sortedData = sortReservations(data);
            setReservations(sortedData);
            setDisplayReservations(sortedData.slice(0, ITEMS_PER_PAGE));
            setStartIndex(ITEMS_PER_PAGE);
            setHasMore(sortedData.length > ITEMS_PER_PAGE);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    /**
     * 화면 크기 변경 이벤트를 설정하는 useEffect 훅
     */
    useEffect(() => {
        window.addEventListener("resize", setInnerWidth);
        return () => {
            window.removeEventListener("resize", setInnerWidth);
        };
    }, []);

    /**
     * 토큰이 있으면 현재 페이지 유지
     * 토큰이 없으면 로그인 창 리다이렉션
     * 토큰의 usertype이 store과 같을 경우 현재 페이지 유지
     * 토큰의 usertype이 store과 다를 경우 메인 페이지 리다이렉션
     */
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = await checkAuthToken(navigate);

            if (userInfo) {
                const requiredRole = 'store'; // 필요한 role  작성 필요
                if (userInfo.userType !== requiredRole) {
                    alert('접근 권한이 없습니다.');
                    navigate('/main');
                    return;
                }

                fetchStoreInfo();
                fetchStats();
                fetchReservations();
            }
        };

        fetchUser();
    }, [navigate]);

    /**
     * 사이드바를 표시하거나 숨기는 함수
     */
    const showHandler = () => {
        setShow(prev => !prev);
    };

    /**
     * 예약 목록을 정렬하는 함수
     */
    const sortReservations = (reservations) => {
        const statusOrder = {
            RESERVED: 1,
            PICKEDUP: 2,
            CANCELED: 2,
            NOSHOW: 2
        };

        return reservations.sort((a, b) => {
            const statusComparison = statusOrder[a.status] - statusOrder[b.status];
            if (statusComparison !== 0) {
                return statusComparison;
            }

            const getTime = (reservation) => {
                switch (reservation.status) {
                    case 'RESERVED':
                        return new Date(reservation.pickupTime);
                    case 'PICKEDUP':
                        return new Date(reservation.pickedUpAt);
                    case 'CANCELED':
                        return new Date(reservation.cancelReservationAt);
                    case 'NOSHOW':
                        return new Date(reservation.pickupTime);
                    default:
                        return new Date();
                }
            };

            if (a.status === 'RESERVED' && b.status === 'RESERVED') {
                return getTime(a) - getTime(b);
            }

            return getTime(b) - getTime(a);
        });
    };

    /**
     * 추가 데이터를 불러오는 함수 (무한 스크롤)
     */
    const loadMore = () => {
        if (!hasMore || isLoading) return;

        setIsLoading(true);
        setTimeout(() => {
            const newStartIndex = startIndex + ITEMS_PER_PAGE;
            const moreReservations = isFiltered
                ? filteredReservations.slice(startIndex, newStartIndex)
                : reservations.slice(startIndex, newStartIndex);

            setDisplayReservations(prev => [...prev, ...moreReservations]);
            setStartIndex(newStartIndex);
            setHasMore(newStartIndex < (isFiltered ? filteredReservations : reservations).length);
            setIsLoading(false);
        }, 500);
    };

    /**
     * 스크롤 이벤트를 처리하는 함수 (무한 스크롤)
     */
    const handleWindowScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 1) return;
        if (hasMore && !isLoading) {
            loadMore();
        }
    };

    /**
     * 스크롤 이벤트를 추가하는 useEffect 훅
     * 화면 너비가 400px 이하일 때 작동
     */
    useEffect(() => {
        if (width <= 400) {
            window.addEventListener('scroll', handleWindowScroll);
            return () => window.removeEventListener('scroll', handleWindowScroll);
        }
    }, [startIndex, hasMore, isLoading, width, isFiltered]);

    /**
     * 필터를 적용하는 함수
     */
    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
        setIsFiltered(true);
        const filtered = reservations.filter(reservation => applyCurrentFilters(reservation, newFilters));
        setFilteredReservations(filtered);
        setDisplayReservations(filtered.slice(0, ITEMS_PER_PAGE));
        setStartIndex(ITEMS_PER_PAGE);
        setHasMore(filtered.length > ITEMS_PER_PAGE);
    };

    /**
     * 현재 필터를 적용해 예약 목록을 필터링하는 함수
     */
    const applyCurrentFilters = (reservation, currentFilters = filters) => {
        const { dateRange, status = [] } = currentFilters;
        const { startDate, endDate } = dateRange || {};

        const startDateFilter = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
        const endDateFilter = endDate ? new Date(endDate).setHours(0, 0, 0, 0) : null;
        const reservationDate = new Date(reservation.reservationTime).setHours(0, 0, 0, 0);
        const withinDateRange = (!startDateFilter || reservationDate >= startDateFilter) &&
            (!endDateFilter || reservationDate <= endDateFilter);

        const matchesStatus = status.length === 0 || status.includes(reservation.status);

        return withinDateRange && matchesStatus;
    };

    /**
     * 필터를 초기화하고 원본 데이터를 불러오는 함수
     */
    const resetFilters = () => {
        setIsFiltered(false);
        setFilteredReservations([]);
        setDisplayReservations(reservations.slice(0, ITEMS_PER_PAGE));
        setStartIndex(ITEMS_PER_PAGE);
        setHasMore(reservations.length > ITEMS_PER_PAGE);
    };

    // 예약 목록을 업데이트하는 함수
    const handleUpdateReservations = (updatedReservations) => {
        setReservations(updatedReservations);
        // 필터가 적용된 상태라면 필터링된 목록도 업데이트
        if (isFiltered) {
            const filtered = updatedReservations.filter(reservation => applyCurrentFilters(reservation, filters));
            setFilteredReservations(filtered);
            setDisplayReservations(filtered.slice(0, ITEMS_PER_PAGE));
        } else {
            setDisplayReservations(updatedReservations.slice(0, ITEMS_PER_PAGE));
        }
    };

    return (
        <>
            {width <= 400 && <SideBarBtn onShow={showHandler} />}
            <div className={styles.myPageArea}>
                <div className={styles.container}>
                    <Profile
                        storeInfo={storeInfo}
                        stats={stats}
                        isShow={show}
                        width={width}
                    />
                    <div className={styles.content}>
                        <ReservationList
                            reservations={displayReservations}
                            onUpdateReservations={handleUpdateReservations}
                            isLoading={isLoading}
                            loadMore={loadMore}
                            hasMore={hasMore}
                            width={width}
                            initialFilters={filters}
                            onApplyFilters={handleApplyFilters}
                            onResetFilters={resetFilters} // 필터 초기화 기능 추가
                        />
                        {width > 400 && (
                            <>
                                <ProductCount />
                                <Calendar />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default StoreMyPage;