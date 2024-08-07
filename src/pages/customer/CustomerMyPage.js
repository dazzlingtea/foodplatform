import React, { useEffect, useState } from 'react';
import Profile from "../../components/customer/mypage/Profile";
import styles from "./CustomerMyPage.module.scss";
import CustomerReservationList from "../../components/customer/mypage/CustomerReservationList";
import PreferredArea from "../../components/customer/mypage/PreferredArea";
import PreferredFood from "../../components/customer/mypage/PreferredFood";
import FavoriteStore from "../../components/customer/mypage/FavoriteStore";
import SideBarBtn from "../../components/store/mypage-edit/SideBarBtn";

import { jwtDecode } from 'jwt-decode';
import {checkAuthToken} from "../../utils/authUtil";
import {useNavigate} from "react-router-dom";

const BASE_URL = window.location.origin;

const CustomerMyPage = () => {
    // const customerId = "test@gmail.com"; // 하드코딩된 customerId
    const [width, setWidth] = useState(window.innerWidth);
    const [show, setShow] = useState(false);
    const [customerData, setCustomerData] = useState({});
    const [reservations, setReservations] = useState([]);
    const [stats, setStats] = useState({});
    const [displayReservations, setDisplayReservations] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [startIndex, setStartIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const ITEMS_PER_PAGE = 10; // 한번에 가져올 예약목록 개수 설정

    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    const tokenInfo = token ? jwtDecode(token) : null;
    const customerId = tokenInfo ? tokenInfo.sub : null;

    const navigate = useNavigate();

    checkAuthToken(navigate);

    useEffect(() => {
        window.addEventListener("resize", setInnerWidth);
        return () => {
            window.removeEventListener("resize", setInnerWidth);
        }
    }, []);

    useEffect(() => {
        fetchCustomerData();
        fetchReservations();
        fetchStats();
    }, [customerId]);

    const setInnerWidth = () => {
        setWidth(window.innerWidth);
    }

    const fetchCustomerData = async () => {
        try {

            if (!token || !refreshToken) {
                throw new Error('Token or refreshToken not found in localStorage');
            }

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

    const fetchReservations = async () => {
        try {

            const response = await fetch(`${BASE_URL}/reservation/list` , {
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
            setDisplayReservations(sortedData.slice(0, ITEMS_PER_PAGE));
            setStartIndex(ITEMS_PER_PAGE);
            setHasMore(sortedData.length > ITEMS_PER_PAGE);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    const fetchStats = async () => {

        try {
            const response = await fetch(`${BASE_URL}/customer/stats?customerId=${customerId}`
                ,{
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
                        return new Date(); // 기본값 (예외 처리)
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
        setIsLoading(true);
        setTimeout(() => {
            const newStartIndex = startIndex + ITEMS_PER_PAGE;
            const moreReservations = reservations.slice(startIndex, newStartIndex);
            setDisplayReservations(prev => [...prev, ...moreReservations]);
            setStartIndex(newStartIndex);
            setHasMore(newStartIndex < reservations.length);
            setIsLoading(false);
        }, 500);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [startIndex, hasMore, isLoading]);

    const showHandler = () => {
        setShow(prev => !prev);
    }

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
            </div>
        </>
    );
};

export default CustomerMyPage;