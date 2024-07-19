import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import styles from "./AddProductAmountModal.module.scss";
import {useModal} from "../common/ModalProvider";

const AddProductAmountModal = ({products, updateProductCount}) => {

    const closeModal = useModal();

    const [initialCount, setInitialCount] = useState(1);
    const [updateCount, setUpdateCount] = useState(0);

    const handleIncrease = () => {
        setInitialCount(prevCount => prevCount + 1);
        setUpdateCount(prevCount => prevCount + 1);
    };

    const handleDecrease = () => {
        if (initialCount > 0) {
            setInitialCount(prevCount => prevCount - 1);
            setUpdateCount(prevCount => prevCount - 1);
        }
    };

    return (
        <div className={styles.productAddItem}>
            <img className={styles.img} src="/assets/img/caution2.png" alt="경고 이미지"/>
            <div className={styles.warning}>수량 추가 후 되돌리기 불가합니다.</div>
            <div className={styles.warning}>신중히 선택해주세요</div>
            <div id="product-amount-adjust-btn" className={styles.productAmtAdjustBtn}>
                <button className={styles.adjustBtn} onClick={handleDecrease} disabled={initialCount <= 1}>
                    <FontAwesomeIcon icon={faMinus}/>
                </button>
                <p id="product-update-count" className={styles.initialCnt}>{initialCount}</p>
                <button className={styles.adjustBtn} onClick={handleIncrease}>
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
            </div>
            <div>오늘 남은 수량</div>
            <div>추가되는 상품 수: <span id="product-update-amount">{updateCount}</span></div>
            <button className={styles.confirmBtn} onClick={updateProductCount} disabled={updateCount === 0}>추가 확인</button>
        </div>
    );
};

export default AddProductAmountModal;


// import React, { useState } from 'react';
//
// const AddProductAmountModal = ({ products, closeModal, updateProductCount }) => {
//     const [initialCount, setInitialCount] = useState(products.remainCnt);
//     const [updateCount, setUpdateCount] = useState(0);
//
//     const handleIncrease = () => {
//         setInitialCount(prevCount => prevCount + 1);
//         setUpdateCount(prevCount => prevCount + 1);
//     };
//
//     const handleDecrease = () => {
//         if (initialCount > products.remainCnt) {
//             setInitialCount(prevCount => prevCount - 1);
//             setUpdateCount(prevCount => prevCount - 1);
//         }
//     };
//
//     const handleUpdate = async () => {
//         try {
//             const response = await fetch(`${BASE_URL}/store/mypage/main/updateProductCnt`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     newCount: updateCount, // 업데이트할 수량
//                 }),
//             });
//
//             const result = await response.json();
//             if (result === true) {
//                 alert('수량이 업데이트되었습니다.');
//                 closeModal();
//                 updateProductCount();
//             } else {
//                 console.error('수량 업데이트 실패');
//             }
//         } catch (error) {
//             console.error('Error updating product count:', error);
//         }
//     };
//
//     return (
//         <div className="modal">
//             <div className="modal-content">
//                 <span className="close" onClick={closeModal}>&times;</span>
//                 <div className="product-add-item">
//                     <img src="/assets/img/caution2.png" alt="경고 이미지" />
//                     <div>수량 추가 후 되돌리기 불가합니다.</div>
//                     <div>신중히 선택해주세요</div>
//                     <div id="product-amount-adjust-btn">
//                         <button className="yellow-click" onClick={handleDecrease} disabled={initialCount <= products.remainCnt}>
//                             <i className="fas fa-minus"></i>
//                         </button>
//                         <p id="product-update-count">{initialCount}</p>
//                         <button className="yellow-click" onClick={handleIncrease}>
//                             <i className="fas fa-plus"></i>
//                         </button>
//                     </div>
//                     <div>오늘 남은 수량</div>
//                     <div>추가되는 상품 수: <span id="product-update-amount">{updateCount}</span></div>
//                     <button className="yellow-click" onClick={handleUpdate} disabled={updateCount === 0}>추가 확인</button>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default AddProductAmountModal;
//
