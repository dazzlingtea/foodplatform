import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FavoriteStore.module.scss';
import {DEFAULT_IMG, imgErrorHandler} from "../../../utils/error";

const FavoriteStore = ({ favStores = [] }) => {
    return (
        <div className={styles.favoriteStoreForm}>
            <div className={styles.title}>
                <h3 className={styles.titleText}>최애 가게</h3>
            </div>
            <div className={styles.infoWrapper}>
                <ul className={styles.store}>
                    {favStores.length > 0 ? (
                        favStores.map((store) => (
                            <li key={store.storeId}>
                                <Link to="#" className={styles.storeLink}>
                                    <div className={styles.imgBox}>
                                        <img src={store.storeImg || DEFAULT_IMG} onError={imgErrorHandler} alt="최애가게이미지" />
                                    </div>
                                    <span>{store.storeName}</span>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li>최애 가게가 없습니다.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default FavoriteStore;