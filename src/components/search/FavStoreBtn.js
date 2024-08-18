import React from 'react';
import styles from "./SearchList.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import {faHeart as faHeartRegular} from "@fortawesome/free-regular-svg-icons";
import {authFetch} from "../../utils/authUtil";
import {FAVORITESTORE_URL} from "../../config/host-config";

const FavStoreBtn = ({ favorites, setFavorites, storeId }) => {

    const toggleFavorite = async (storeId) => {
        const response = await authFetch(`${FAVORITESTORE_URL}`, {
            method: 'POST',
            body: JSON.stringify({storeId}),
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data);
        } else {
            console.error(data);
        }
    };

    const favClickHandler = async (e, storeId) => {
        e.stopPropagation();
        await toggleFavorite(storeId);
        setFavorites(prev => {
            const prevLen = prev.length;
            const filtered = prev.filter(e => e !== storeId);
            if (prevLen !== filtered.length) return filtered;
            return [...prev, storeId];
        });
    };

    return (
        <div
            className={`${styles.heartIcon} ${favorites.includes(storeId) ? styles.favorited : styles.notFavorited}`}
            onClick={(e) => favClickHandler(e, storeId)}
        >
            <FontAwesomeIcon
                icon={favorites.includes(storeId) ? faHeartSolid : faHeartRegular}
            />
        </div>
    );
};

export default FavStoreBtn;