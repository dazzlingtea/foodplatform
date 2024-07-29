import React, { useEffect, useState } from 'react';
import Profile from "../../components/customer/mypage/Profile";
import styles from "./CustomerMyPage.module.scss";
import CustomerReservationList from "../../components/customer/mypage/CustomerReservationList";
import PreferredArea from "../../components/customer/mypage/PreferredArea";
import PreferredFood from "../../components/customer/mypage/PreferredFood";
import FavoriteStore from "../../components/customer/mypage/FavoriteStore";
import SideBarBtn from "../../components/store/mypage-edit/SideBarBtn";

const BASE_URL = window.location.origin;

const CustomerMyPage = () => {
    const customerId = "test@gmail.com"; // 하드코딩된 customerId
    const [width, setWidth] = useState(window.innerWidth);
    const [show, setShow] = useState(false);
    const [customerData, setCustomerData] = useState({});
    const [reservations, setReservations] = useState([]);
    const [stats, setStats] = useState({});

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
            const response = await fetch(`${BASE_URL}/customer/info?customerId=${customerId}`);
            if (!response.ok) throw new Error('Failed to fetch customer info');
            const data = await response.json();
            setCustomerData(data);
        } catch (error) {
            console.error('Error fetching customer info:', error);
        }
    };

    const fetchReservations = async () => {
        try {
            const response = await fetch(`${BASE_URL}/reservation/list`);
            if (!response.ok) throw new Error('Failed to fetch reservations');
            const data = await response.json();
            setReservations(data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await fetch(`${BASE_URL}/customer/stats?customerId=${customerId}`);
            if (!response.ok) throw new Error('Failed to fetch stats');
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const showHandler = () => {
        setShow(prev => !prev);
    }

    return (
        <>
            {width <= 400 && <SideBarBtn onShow={showHandler} />}
            <div className={styles.myPageArea}>
                <div className={styles.container}>
                    <Profile customerMyPageDto={customerData} stats={stats} isShow={show} />
                    <div className={styles.content}>
                        <CustomerReservationList reservations={reservations} onUpdateReservations={setReservations} />
                        <PreferredArea preferredAreas={customerData.preferredArea} />
                        <PreferredFood preferredFoods={customerData.preferredFood} />
                        <FavoriteStore favStores={customerData.favStore} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerMyPage;