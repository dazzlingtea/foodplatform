import React, { useState } from 'react';
import styles from './CategoryList.module.scss';
import { useModal } from '../../pages/common/ModalProvider';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWonSign, faBoxOpen, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { imgErrorHandler } from '../../utils/error';

const CategoryList = ({ stores }) => {
    const { openModal } = useModal();
    const [favorites, setFavorites] = useState({}); // 찜 상태를 관리할 객체

    const handleClick = (store) => {
        openModal('productDetail', { productDetail: store });
    };

    const handleFavoriteClick = (storeId) => {
        setFavorites(prevFavorites => ({
            ...prevFavorites,
            [storeId]: !prevFavorites[storeId]
        }));
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
                        <div 
                            className={styles.heartIcon} 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleFavoriteClick(store.storeId);
                            }}
                        >
                            <FontAwesomeIcon 
                                icon={favorites[store.storeId] ? faHeartSolid : faHeartRegular} 
                                className={favorites[store.storeId] ? styles.favorited : styles.notFavorited}
                            />
                        </div>
                        <img src={store.storeImg} alt={store.storeName} className={styles.categoryImage} onError={imgErrorHandler} />
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
