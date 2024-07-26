import React, {useState, useEffect} from 'react';
import {useModal} from "../common/ModalProvider";
import styles from './ProductDetailModal.module.scss';
import {faMinus, faPlus, faShoppingCart, faStar, faTag} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import StoreInfo from "./StoreInfo";
import ProductDetail from "./ProductDetail";
import PaymentBox from "./PaymentBox";
import BottomPlaceOrder from "./BottomPlaceOrder";

const ProductDetailModal = ({/* productDetail, makeReservation*/}) => {
    const {closeModal} = useModal(); // useModal에서 closeModal 함수 가져오기

    const [initialCount, setInitialCount] = useState(1);
    const [updateCount, setUpdateCount] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 400);

    // 테스트 용
    const productDetail = {
        storeInfo: {
            storeName: "taco bell",
            storeAddress: "마포구 서교동 395-124",
            business_number: "가게 전화번호",
            storeImg: "assets/img/404page.jpg",
            storeRating: 4.5,
            pickUpTime: "17:00 ~ 19:00",
            desc: "우리가게는 맛있는 타코를 팔아요! 타코 먹고싶어~~진짜 타코 진짜진짜 찐 타코",
            price: 5900,
            remainProduct: 10,
        },

    }

    // 테스트 용
    const makeReservation = (count) => {
        alert(`${count}개 예약이 완료되었습니다.`);
        closeModal();
    }

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 400);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleIncrease = () => {
        setInitialCount(prevCount => prevCount + 1);
        setUpdateCount(prevCount => prevCount + 1);
    };

    const handleDecrease = () => {
        if (initialCount > 1) { // 0이 아니라 1로 수정
            setInitialCount(prevCount => prevCount - 1);
            setUpdateCount(prevCount => prevCount - 1);
        }
    };

    return (
        <section className={styles.productDetailModal}>
            <section className={styles.infoBox}>
                <StoreInfo productDetail={productDetail}/>
                <ProductDetail productDetail={productDetail}/>
                {isMobile ? (<></>) : (<BottomPlaceOrder makeReservation={makeReservation}/>)}
            </section>
            {isMobile ? (
                <></>
            ) : (
                <PaymentBox makeReservation={makeReservation} productDetail={productDetail}/>
            )}
        </section>
    );
};

export default ProductDetailModal;
