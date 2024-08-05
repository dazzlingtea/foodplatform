import React from 'react';
import styles from './CategoryList.module.scss';
import { useModal } from '../../pages/common/ModalProvider';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWonSign, faBoxOpen } from "@fortawesome/free-solid-svg-icons";

const CategoryList = ({ stores }) => {
    const { openModal } = useModal();

    const handleClick = (store) => {
        openModal('productDetail', { productDetail: store });
    };

    return (
        <div className={styles.list}>
            <h1 className={styles.storeList}>우리 동네 가게 리스트</h1>
            <div className={styles.categoryContainer}>
                {stores.map((store, index) => (
                    <div 
                        key={index} 
                        className={`${styles.categoryItem} ${store.productCnt === 1 ? styles['low-stock'] : ''}`}
                        onClick={() => handleClick(store)}
                    >
                        <img src={store.storeImg} alt={store.storeName} className={styles.categoryImage} />
                        {store.productCnt === 1 && <div className={styles.overlay}>SOLD OUT</div>}
                        <p className={styles.categoryName}>{store.storeName}</p>
                        
                        <span className={styles.storePrice}><FontAwesomeIcon icon={faWonSign} /> {store.price}원</span>
                        <span className={styles.productCnt}><FontAwesomeIcon icon={faBoxOpen} /> {store.productCnt}/{store.productCnt}</span>
                    </div>
                ))}
            </div> 
        </div>
    );
}

export default CategoryList;
