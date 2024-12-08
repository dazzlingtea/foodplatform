import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import styles from "./AddProductAmountModal.module.scss";
import {useModal} from "../common/ModalProvider";

//  추가 props 필요 - 기존 remainCnt 값
// const handleProductUpdate = () => {
//     openModal('addProductAmount', {
//         addProductAmount: handleAddProductAmount,
//         remainCnt: productData.remainCnt
//     });
// };

const AddProductAmountModal = ({addProductAmount, remainCnt}) => {

    const {closeModal} = useModal();

    const [initialCount, setInitialCount] = useState(remainCnt);
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

    const handleAddConfirm = () => {
        addProductAmount(updateCount);
        alert(`${updateCount}개의 상품이 추가되었습니다.`);
        closeModal();
    }

    return (
        <div className={styles.productAddItem}>
            <img className={styles.img} src="/assets/img/caution2.png" alt="경고 이미지"/>
            <div className={styles.warning}>수량 추가 후 되돌리기 불가합니다.</div>
            <div className={styles.warning}>신중히 선택해주세요</div>
            <div id="product-amount-adjust-btn" className={styles.productAmtAdjustBtn}>
                <button className={styles.adjustBtn} onClick={handleDecrease} disabled={initialCount <= remainCnt}>
                    <FontAwesomeIcon icon={faMinus}/>
                </button>
                <p id="product-update-count" className={styles.initialCnt}>{initialCount}</p>
                <button className={styles.adjustBtn} onClick={handleIncrease}>
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
            </div>
            <div>오늘 남은 수량</div>
            <div>추가되는 상품 수: <span id="product-update-amount">{updateCount}</span></div>
            <button className={styles.confirmBtn} onClick={handleAddConfirm}  disabled={updateCount === 0}>추가 확인</button>
        </div>
    );
};

export default AddProductAmountModal;