import React, {useState, useEffect} from 'react';
import {useModal} from '../common/ModalProvider';
import styles from './ProductDetailModal.module.scss';
import StoreInfo from './StoreInfo';
import ProductDetail from './ProductDetail';
import PaymentBox from './PaymentBox';
import BottomPlaceOrder from './BottomPlaceOrder';

const ProductDetailModal = ({productDetail, onClose}) => {
    const {closeModal} = useModal();

    const [initialCount, setInitialCount] = useState(1);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 400);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 400);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleIncrease = () => {
        if (initialCount < productDetail.productCnt) {
            setInitialCount(prevCount => prevCount + 1);
        }
    };

    const handleDecrease = () => {
        if (initialCount > 1) {
            setInitialCount(prevCount => prevCount - 1);
        }
    };

    const makeReservation = (count) => {
        if (productDetail.productCnt <= 1) {
            alert("해당 상품은 품절되었습니다.");
        } else {
            alert(`${count}개 예약이 완료되었습니다.`);
        }
        closeModal();
        if (onClose) onClose();
    };

    if (!productDetail) return null;

    const {storeName, storeImg, address, openAt, closedAt, price, storeId, storeContact, productCnt} = productDetail;


    const productInfo = {
        storeInfo: {
            storeName,
            storeAddress: address,
            storeImg,
            openAt,
            closedAt,
            storeContact,
            price,
            storeId,
            remainProduct: productCnt,
            productImg,
        },
    };

    return (
        <section className={styles.productDetailModal}>
            <section className={styles.infoBox}>
                <StoreInfo productDetail={productInfo}/>
                <ProductDetail productDetail={productInfo}/>
                <BottomPlaceOrder
                    makeReservation={makeReservation}
                    productDetail={productInfo}
                    initialCount={initialCount}
                    handleIncrease={handleIncrease}
                    handleDecrease={handleDecrease}
                    remainProduct={productCnt}
                    closeModal={closeModal}
                />
            </section>
            {!isMobile && (
                <PaymentBox
                    makeReservation={makeReservation}
                    productDetail={productInfo}
                    initialCount={initialCount}
                    handleIncrease={handleIncrease}
                    handleDecrease={handleDecrease}
                />
            )}
        </section>
    );
};

export default ProductDetailModal;
