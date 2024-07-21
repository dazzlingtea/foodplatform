import React from 'react';
import Profile from "../../components/customer/mypage/Profile";
import styles from "./CustomerMyPage.module.scss";
import CustomerReservationList from "../../components/customer/mypage/CustomerReservationList";
import PreferredArea from "../../components/customer/mypage/PreferredArea";
import PreferredFood from "../../components/customer/mypage/PreferredFood";
import FavoriteStore from "../../components/customer/mypage/FavoriteStore";
import { useModal } from "../common/ModalProvider";

const customerMyPageDto = {
    profileImage: '/assets/img/defaultImage.jpg',
    nickname: '김한솔인듯아닌듯',
    customerId: '아이디알려줄듯말듯',
    preferredArea: ['서울', '부산', '제주'],
    preferredFood: [
        { foodImage: '/assets/img/etc.jpg', preferredFood: '김치찌개' },
        { foodImage: '/assets/img/etc.jpg', preferredFood: '된장찌개' }
    ],
    favStore: [
        { storeId: 1, storeImg: '/assets/img/etc.jpg', storeName: '가게1' },
        { storeId: 2, storeImg: '/assets/img/etc.jpg', storeName: '가게2' }
    ]
};

const stats = {
    coTwo: 10.5,
    money: 50000
};

const reservations = [
    {
        reservationId: 1,
        storeImg: '/assets/img/etc.jpg',
        storeName: '가게1',
        status: 'RESERVED',
        pickupTimeF: '2024-07-18 18:00'
    },
    {
        reservationId: 2,
        storeImg: '/assets/img/etc.jpg',
        storeName: '가게2',
        status: 'CANCELED',
        cancelReservationAtF: '2024-07-17 12:00'
    }
];

// customerId 어디서 가져와야함?!
const CustomerMyPage = ({ customerId }) => {
    const { openModal } = useModal();

    return (
        <>
            <div className={styles.myPageArea}>
                <div className={styles.container}>
                    <Profile
                        customerMyPageDto={customerMyPageDto}
                        stats={stats}
                    />
                    <div className={styles.content}>
                        <CustomerReservationList
                            customerId={customerId}
                            openModal={openModal} // 모달을 여는 함수 전달
                        />
                        <PreferredArea preferredAreas={customerMyPageDto.preferredArea}/>
                        <PreferredFood preferredFoods={customerMyPageDto.preferredFood}/>
                        <FavoriteStore favStores={customerMyPageDto.favStore}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerMyPage;