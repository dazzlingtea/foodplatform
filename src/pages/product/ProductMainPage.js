import React, {useState} from 'react';
import ProductDetailModal from "./ProductDetailModal";
import {useModal} from "../common/ModalProvider";

const ProductMainPage = () => {

    const {openModal} = useModal();


    const handleModal = () => {
        openModal('productDetail', {productId: 1});
    }

    return (
        <>
            <button style={{fontSize: 20}} onClick={handleModal}>상품 상세 조회 버튼</button>
        </>
    );
};

export default ProductMainPage;