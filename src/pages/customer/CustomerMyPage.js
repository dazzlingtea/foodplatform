import React, {useEffect, useState} from 'react';
import Profile from "../../components/customer/mypage/Profile";
import styles from "./CustomerMyPage.module.scss";
import CustomerReservationList from "../../components/customer/mypage/CustomerReservationList";
import PreferredArea from "../../components/customer/mypage/PreferredArea";
import PreferredFood from "../../components/customer/mypage/PreferredFood";
import FavoriteStore from "../../components/customer/mypage/FavoriteStore";
import { useModal } from "../common/ModalProvider";
import SideBarBtn from "../../components/store/mypage-edit/SideBarBtn";

const customerMyPageDto = {
    profileImage: '/assets/img/defaultImage.jpg',
    nickname: '김한솔인듯아닌듯',
    customerId: '아이디알려줄듯말듯',
    preferredArea: ['서울', '부산', '제주', '경주', '전주', '홍콩', '뉴욕', '일본'],
    preferredFood: [
        { foodImage: '/assets/img/etc.jpg', preferredFood: '김치찌개' },
        { foodImage: '/assets/img/etc.jpg', preferredFood: '된장찌개' },
        { foodImage: '/assets/img/etc.jpg', preferredFood: '된장찌개' },
        { foodImage: '/assets/img/etc.jpg', preferredFood: '된장찌개' },
        { foodImage: '/assets/img/etc.jpg', preferredFood: '된장찌개' }
    ],
    favStore: [
        { storeId: 1, storeImg: '/assets/img/etc.jpg', storeName: '가게1' },
        { storeId: 2, storeImg: '/assets/img/etc.jpg', storeName: '가게2' },
        { storeId: 3, storeImg: '/assets/img/etc.jpg', storeName: '가게3' },
        { storeId: 4, storeImg: '/assets/img/etc.jpg', storeName: '가게4' },
        { storeId: 5, storeImg: '/assets/img/etc.jpg', storeName: '가게5' }
    ]
};

const stats = {
    coTwo: 10.5,
    money: 50000
};
// 여기까지 더미데이터

// customerId 어디서 가져와야함?!
const CustomerMyPage = ({ customerId }) => {
    const { openModal } = useModal();

    const [width, setWidth] = useState(window.innerWidth);
    const [show, setShow] = useState(false);
    const setInnerWidth = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", setInnerWidth);
        return () => {
            window.removeEventListener("resize", setInnerWidth);
        }
    }, );
    const showHandler = () => {
        setShow(prev => !prev);
    }

    return (
        <>
            {width <= 400 && <SideBarBtn onShow={showHandler}/>}
            <div className={styles.myPageArea}>
                <div className={styles.container}>
                    <Profile
                        customerMyPageDto={customerMyPageDto}
                        stats={stats}
                        isShow={show}
                    />
                    <div className={styles.content}>
                        <CustomerReservationList
                            customerId={customerId}
                            openModal={openModal}
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