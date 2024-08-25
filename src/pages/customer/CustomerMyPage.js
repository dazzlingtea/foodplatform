import React, { useEffect, useState } from 'react';
import Profile from "../../components/customer/mypage/Profile";
import styles from "./CustomerMyPage.module.scss";
import CustomerReservationList from "../../components/customer/mypage/CustomerReservationList";
import PreferredArea from "../../components/customer/mypage/PreferredArea";
import PreferredFood from "../../components/customer/mypage/PreferredFood";
import FavoriteStore from "../../components/customer/mypage/FavoriteStore";
import SideBarBtn from "../../components/store/mypage-edit/SideBarBtn";

import {authFetch, checkAuthToken} from "../../utils/authUtil";
import {useNavigate} from "react-router-dom";
import MobileMenuBar from '../../layout/MobileMenuBar';

const BASE_URL = window.location.origin;

const CustomerMyPage = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [show, setShow] = useState(false);
    const [customerData, setCustomerData] = useState({});
    const [reservations, setReservations] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [stats, setStats] = useState({});
    const [displayReservations, setDisplayReservations] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [startIndex, setStartIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null); // userInfo를 상태로 관리
    const ITEMS_PER_PAGE = 10;

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
                const requiredRoles = ['customer', 'admin']; // 필요한 역할 목록
                if (!requiredRoles.includes(userInfo.userType)) {
                    alert('접근 권한이 없습니다.');
                    navigate('/main');
                    return;
                }

                setUserInfo(userInfo); // userInfo 상태 저장
                fetchCustomerData(userInfo.token, userInfo.refreshToken, userInfo.email);
                fetchReservations(userInfo.token, userInfo.refreshToken, userInfo.email);
                fetchStats(userInfo.token, userInfo.refreshToken, userInfo.email);
            }
        };

        fetchUser();
    }, [navigate]);

    useEffect(() => {
        window.addEventListener("resize", setInnerWidth);
        return () => {
            window.removeEventListener("resize", setInnerWidth);
        }
    }, []);

    const setInnerWidth = () => {
        setWidth(window.innerWidth);
    };

    const fetchCustomerData = async (token, refreshToken, customerId) => {
        try {
            const response = await fetch(`${BASE_URL}/customer/info?customerId=${customerId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'refreshToken': refreshToken
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch customer info');
            }
            const data = await response.json();
            setCustomerData(data);
        } catch (error) {
            console.error('Error fetching customer info:', error);
        }
    };

    const fetchReservations = async (token, refreshToken) => {
        try {
            const response = await authFetch(`${BASE_URL}/reservation/list`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'refreshToken': refreshToken
                }
            });

            if (!response.ok) throw new Error('Failed to fetch reservations');
            const data = await response.json();
            const sortedData = sortReservations(data);
            setReservations(sortedData);
            setFilteredReservations(sortedData);
            setDisplayReservations(sortedData.slice(0, ITEMS_PER_PAGE));
            setStartIndex(ITEMS_PER_PAGE);
            setHasMore(sortedData.length > ITEMS_PER_PAGE);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    const fetchStats = async (token, refreshToken, customerId) => {
        try {
            const response = await authFetch(`${BASE_URL}/customer/stats?customerId=${customerId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'refreshToken': refreshToken
                }
            });

            if (!response.ok) throw new Error('Failed to fetch stats');
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

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

            // 각 상태에 맞는 시간 값 선택
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

            // RESERVED 상태인 경우 시간 내림차순
            if (a.status === 'RESERVED' && b.status === 'RESERVED') {
                return getTime(a) - getTime(b);
            }

            // 그 외의 상태인 경우 시간 오름차순
            return getTime(b) - getTime(a);
        });
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 1) return;
        if (hasMore && !isLoading) {
            loadMore();
        }
    };

    const loadMore = () => {
        if (!hasMore || isLoading) return;
        setIsLoading(true);
        setTimeout(() => {
            const newStartIndex = startIndex + ITEMS_PER_PAGE;
            const moreReservations = filteredReservations.slice(startIndex, newStartIndex);
            setDisplayReservations(prev => [...prev, ...moreReservations]);
            setStartIndex(newStartIndex);
            setHasMore(newStartIndex < filteredReservations.length);
            setIsLoading(false);
        }, 500);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [startIndex, hasMore, isLoading, filteredReservations]);

    const showHandler = () => {
        setShow(prev => !prev);
    };

    const applyFilters = (filters) => {
        const { category, dateRange, status } = filters;

        const filtered = reservations.filter(reservation => {
            const categoryMatch = category.length === 0 || category.includes(reservation.category);
            const statusMatch = status.length === 0 || status.includes(reservation.status);

            const reservationDate = new Date(reservation.reservationTime).setHours(0, 0, 0, 0); // 시간을 0시 0분으로 초기화하여 날짜만 비교
            const startDate = dateRange.startDate ? new Date(dateRange.startDate).setHours(0, 0, 0, 0) : null;
            const endDate = dateRange.endDate ? new Date(dateRange.endDate).setHours(0, 0, 0, 0) : null;

            const dateMatch = (!startDate || reservationDate >= startDate) &&
                (!endDate || reservationDate <= endDate);

            return categoryMatch && statusMatch && dateMatch;
        });

        setFilteredReservations(filtered);
        setDisplayReservations(filtered.slice(0, ITEMS_PER_PAGE));
        setStartIndex(ITEMS_PER_PAGE);
        setHasMore(filtered.length > ITEMS_PER_PAGE);
    };

    return (
        <>
            {width <= 400 && <SideBarBtn onShow={showHandler} />}
            <div className={styles.myPageArea}>
                <div className={styles.container}>
                    <Profile customerMyPageDto={customerData} stats={stats} isShow={show} width={width} />
                    <div className={styles.content}>
                        <CustomerReservationList
                            reservations={displayReservations}
                            onUpdateReservations={setReservations}
                            loadMore={loadMore}
                            hasMore={hasMore}
                            isLoading={isLoading}
                            onApplyFilters={applyFilters}
                            onFetchReservations={() => fetchReservations(userInfo.token, userInfo.refreshToken)}
                        />

                        {width > 400 && (
                            <>
                                <PreferredArea preferredAreas={customerData.preferredArea} />
                                <PreferredFood preferredFoods={customerData.preferredFood} />
                                <FavoriteStore favStores={customerData.favStore} />
                                
                            </>
                        )}
                    </div>
                </div>
                {width <= 400 && <MobileMenuBar />}
            </div>
        </>
    );
};

export default CustomerMyPage;