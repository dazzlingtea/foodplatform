import React, {useEffect, useState} from 'react';
import styles from "./SearchList.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBoxOpen, faWonSign} from "@fortawesome/free-solid-svg-icons";
import {imgErrorHandler} from "../../utils/error";
import {useModal} from "../../pages/common/ModalProvider";
import {FAVORITESTORE_URL} from "../../config/host-config";
import {authFetch, checkAuthFn, getToken} from "../../utils/authUtil";
import {useNavigate, useSearchParams} from "react-router-dom";
import {categoryImgList} from "../../utils/img-handler";
import FavStoreBtn from "./FavStoreBtn";

const SearchList = ({stores = [], setStores}) => {
    const {openModal} = useModal();
    const [favorites, setFavorites] = useState([]);
    const [keyword, setKeyword] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const response = await authFetch(`${FAVORITESTORE_URL}`);
            const data = await response.json();
            if (response.ok) {
                const target = data.map(e => e.storeId);
                setFavorites(target);
            } else {
                console.error(data);
            }
        })();
    }, []);

    const clickHandler = (store) => {
        checkAuthFn(() => openModal('productDetail', {productDetail: store, setStoreListHandler}), navigate);
    };

    const setStoreListHandler = (storeId, cnt) => {
        setStores(prev => prev.map(e => {
                if (e.storeId === storeId) {
                    return {...e, restCnt: e.restCnt - cnt};
                }
                return e;
            })
        );
    }

    return (
        <div className={styles.list}>
            <h1
                className={`${styles.storeList} ${stores.length === 0 && styles.empty}`}>
                검색 결과{stores.length > 0 ? ` '${keyword.get('q')}'` : '가 없습니다.'}
            </h1>
            <div className={styles.categoryContainer}>
                {
                    stores.length > 0 &&
                    stores.map((store, index) => (
                        <div
                            key={index}
                            className={`${styles.categoryItem} ${store.productCnt === 0 ? styles['low-stock'] : ''}`}
                            onClick={() => clickHandler(store)}
                        >
                            <FavStoreBtn favorites={favorites} setFavorites={setFavorites} storeId={store.storeId}/>
                            <img src={store.storeImg || categoryImgList[store.category]} alt={store.storeName}
                                 className={styles.categoryImage} onError={imgErrorHandler}/>
                            {store.productCnt === 0 && <div className={styles.overlay}>SOLD OUT</div>}
                            <p className={styles.categoryName}>{store.storeName}</p>
                            <span className={styles.storePrice}>{store.price}원</span>
                            <span className={styles.productCnt}>(수량 {store.restCnt})</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default SearchList;