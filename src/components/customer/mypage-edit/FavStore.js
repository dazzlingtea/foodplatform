import React, {useState} from 'react';
import styles from "./Edit.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {CUSTOMER_URL} from "../../../config/host-config";
import {authFetch} from "../../../utils/authUtil";

const FavStore = ({ favList, set}) => {
    const clickHandler = async (type, {storeId, storeName}) => {
        const payload = {
            type,
            value: storeId
        }
        const res = await authFetch(CUSTOMER_URL + `/edit`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });
        if (res.ok) {
            alert("삭제되었습니다");
            console.log('Delete successful');
            set(prev => prev.filter((item) => item.storeName !== storeName));
        } else {
            const errorText = await res.text();
            console.error('Delete failed:', errorText);
        }
    }
    return (
        <div className={styles['edit-box']}>
            <div className={styles.title}>
                <h3 className={styles["title-text"]}>
                    <span> 최애가게 </span>
                </h3>
            </div>
            <div className={styles['edit-wrapper']}>
                <ul className={styles.preferred} id="preferred-area">
                    {
                        favList.map((item, idx) => (
                                <li id={idx} key={idx}>
                                    <div className={styles["img-box"]}>
                                        <img src={item.storeImg} alt="선호음식이미지"/>
                                    </div>
                                    <span>{item.storeName}</span>
                                    <FontAwesomeIcon
                                        className={styles.xmark} icon={faCircleXmark}
                                        onClick={() => clickHandler("favStore", item)}
                                    />
                                </li>
                            )
                        )
                    }
                </ul>
            </div>
        </div>
    );
};

export default FavStore;