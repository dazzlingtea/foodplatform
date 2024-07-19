import React from 'react';
import {useModal} from "../common/ModalProvider";

const ProductDetailModal = () => {

    const closeModal = useModal();

    // const closeHandler = () => {
    //     alert('확인 완료');
    //     closeModal;
    // }

    return (
        <div>
            상품 상세 조회 및 예약 프로세스 진행
        </div>
    );
};

export default ProductDetailModal;