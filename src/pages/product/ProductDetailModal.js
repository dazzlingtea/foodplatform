import React, { useState, useEffect } from 'react';
import { useModal } from "../common/ModalProvider";
import styles from './ProductDetailModal.module.scss';
import { faMinus, faPlus, faShoppingCart, faStar, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StoreInfo from "./StoreInfo";
import ProductDetail from "./ProductDetail";
import PaymentBox from "./PaymentBox";
import BottomPlaceOrder from "./BottomPlaceOrder";

const ProductDetailModal = ({ productDetail }) => {
    const { closeModal } = useModal(); // useModal에서 closeModal 함수 가져오기

    const [initialCount, setInitialCount] = useState(1);
    const [updateCount, setUpdateCount] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 400);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 390);
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
                <StoreInfo />
                <ProductDetail />
                {isMobile? (<></>) : (<BottomPlaceOrder/>)}
            </section>
            {isMobile ? (
                <></>
            ) : (
                <PaymentBox />
            )}
        </section>
    );
};

export default ProductDetailModal;
