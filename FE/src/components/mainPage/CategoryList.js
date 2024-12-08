import React, { useState, useEffect } from 'react';
import styles from './CategoryList.module.scss';
import { useModal } from '../../pages/common/ModalProvider';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWonSign, faBoxOpen, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { DEFAULT_IMG, imgErrorHandler } from '../../utils/error';
import { FAVORITESTORE_URL } from '../../config/host-config';
import { getRefreshToken, getToken, getUserEmail } from "../../utils/authUtil";

// 하트 상태를 토글하고 서버에 저장하는 함수
const toggleFavorite = async (storeId, customerId) => {
    try {
        const response = await fetch(`${FAVORITESTORE_URL}/${storeId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
                'refreshToken': getRefreshToken()
            },
            body: JSON.stringify({ customerId }),
        });

        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            await response.json();
        } else {
            const text = await response.text();
            console.error('⚠️Unexpected response format:', text);
        }
    } catch (error) {
        console.error('⚠️Error toggling:', error);
    }
};

// 사용자의 모든 찜 상태 조회
const fetchFavorites = async (customerId, setFavorites) => {
    try {
        const response = await fetch(`${FAVORITESTORE_URL}/${customerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
                'refreshToken': getRefreshToken(),
            },
        });

        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            const favorites = data.reduce((acc, store) => {
                acc[store.storeId] = true;
                return acc;
            }, {});
            setFavorites(favorites);
        } else {
            const text = await response.text();
            console.error('⚠️Unexpected response format:', text);
        }
    } catch (error) {
        console.error('⚠️Error fetching:', error);
    }
};

const CategoryList = ({ stores }) => {
    const { openModal } = useModal();
    const [favorites, setFavorites] = useState({});

    const customerId = getUserEmail();

    useEffect(() => {
        if (customerId) {
            fetchFavorites(customerId, setFavorites);
        }
    }, [customerId]);

    // 세션 스토리지에서 selectedArea 로드
    const selectedArea = sessionStorage.getItem('selectedArea') || '';

    // selectedArea를 포함하는 가게 필터링
    const filteredStores = stores.filter(store => 
        store.address && selectedArea && store.address.includes(selectedArea)
    );

    const handleClick = (store) => {
        openModal('productDetail', { productDetail: store });
    };

    const handleFavoriteClick = async (storeId) => {
        try {
            await toggleFavorite(storeId, customerId);

            setFavorites(prevFavorites => ({
                ...prevFavorites,
                [storeId]: !prevFavorites[storeId]
            }));
        } catch (error) {
            console.error('⚠️Error toggling:', error);
        }
    };

    return (
        <div className={styles.list}>
            <h1 className={styles.storeList}>우리 동네 가게 리스트</h1>
            <div className={styles.categoryContainer}>
                {filteredStores.length === 0 ? (
                    <div>No stores available for selected area</div>
                ) : (
                    filteredStores.map((store, index) => (
                        <div 
                            key={index} 
                            className={`${styles.categoryItem} ${store.productCnt === 0 ? styles['low-stock'] : ''}`}
                            onClick={() => handleClick(store)}
                        >
                            <div
                                className={`${styles.heartIcon} ${favorites[store.storeId] ? styles.favorited : styles.notFavorited}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleFavoriteClick(store.storeId);
                                }}
                            >
                                <FontAwesomeIcon 
                                    icon={favorites[store.storeId] ? faHeartSolid : faHeartRegular}
                                />
                            </div>
                            <img src={store.storeImg || DEFAULT_IMG} alt={store.storeName} className={styles.categoryImage} onError={imgErrorHandler}/>
                            {store.productCnt === 0 && <div className={styles.overlay}>SOLD OUT</div>}
                            <p className={styles.categoryName}>{store.storeName}</p>
                            <span className={styles.storePrice}> {store.price}원</span>
                            <span className={styles.productCnt}>(수량 {store.productCnt})</span>
                        </div>
                    ))
                )}
            </div> 
        </div>
    );
}

export default CategoryList;
