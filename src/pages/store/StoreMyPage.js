import React from 'react';
import Profile from '../../components/store/mypage/Profile';
import styles from './StoreMyPage.module.scss';
import ReservationList from "../../components/store/mypage/ReservationList";
import ProductCount from "../../components/store/mypage/ProductCount";
import Calendar from "../../components/store/mypage/Calendar";
import { useModal } from '../common/ModalProvider';

// 더미 데이터
const storeInfo = {
    storeImg: "/assets/img/defaultImage.jpg",
    storeName: "그곳",
    storeId: "ggot@gmail.com",
};

const stats = {
    coTwo: "9999",
    customerCnt: "1398475"
};

const reservations = [
    {
        status: "CANCELED",
        profileImage: "/assets/img/defaultImage.jpg",
        nickname: "김",
        cancelReservationAtF: "12월 12일 12시 12분",
        pickupTimeF: "",
        pickedUpAtF: "",
    },
    {
        status: "RESERVED",
        profileImage: "/assets/img/defaultImage.jpg",
        nickname: "이",
        cancelReservationAtF: "",
        pickupTimeF: "12월 13일 14시 00분",
        pickedUpAtF: "",
    },
    {
        status: "PICKEDUP",
        profileImage: "/assets/img/defaultImage.jpg",
        nickname: "박",
        cancelReservationAtF: "",
        pickupTimeF: "",
        pickedUpAtF: "12월 14일 16시 00분",
    },
    {
        status: "NOSHOW",
        profileImage: "/assets/img/defaultImage.jpg",
        nickname: "최",
        cancelReservationAtF: "",
        pickupTimeF: "12월 15일 18시 00분",
        pickedUpAtF: "",
    },
    {
        status: "CANCELED",
        profileImage: "/assets/img/defaultImage.jpg",
        nickname: "정",
        cancelReservationAtF: "12월 16일 10시 00분",
        pickupTimeF: "",
        pickedUpAtF: "",
    },
    {
        status: "RESERVED",
        profileImage: "/assets/img/defaultImage.jpg",
        nickname: "강",
        cancelReservationAtF: "",
        pickupTimeF: "12월 17일 12시 00분",
        pickedUpAtF: "",
    },
    {
        status: "PICKEDUP",
        profileImage: "/assets/img/defaultImage.jpg",
        nickname: "윤",
        cancelReservationAtF: "",
        pickupTimeF: "",
        pickedUpAtF: "12월 18일 14시 00분",
    },
    {
        status: "NOSHOW",
        profileImage: "/assets/img/defaultImage.jpg",
        nickname: "하",
        cancelReservationAtF: "",
        pickupTimeF: "12월 19일 16시 00분",
        pickedUpAtF: "",
    },
    {
        status: "CANCELED",
        profileImage: "/assets/img/defaultImage.jpg",
        nickname: "조",
        cancelReservationAtF: "12월 20일 18시 00분",
        pickupTimeF: "",
        pickedUpAtF: "",
    },
    {
        status: "RESERVED",
        profileImage: "/assets/img/defaultImage.jpg",
        nickname: "임",
        cancelReservationAtF: "",
        pickupTimeF: "12월 21일 10시 00분",
        pickedUpAtF: "",
    }
];

const StoreMyPage = () => {
    const { openModal } = useModal();

    return (
        <div className={styles.myPageArea}>
            <div className={styles.container}>
                <Profile storeInfo={storeInfo} stats={stats} />
                <div className={styles.content}>
                    <ReservationList reservations={reservations} openModal={openModal} />
                    <ProductCount openModal={openModal}/>
                    <Calendar openModal={openModal}/>
                </div>
            </div>
        </div>
    );
};

export default StoreMyPage;