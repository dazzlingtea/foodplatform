import React, {useEffect, useState} from 'react';
import styles from "./Edit.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faPlus} from "@fortawesome/free-solid-svg-icons";
import {CUSTOMER_URL} from "../../../config/host-config";
import {authFetch} from "../../../utils/authUtil";
import {useModal} from "../../../pages/common/ModalProvider";
import AddFavFoodBtn from "./fav-food/AddFavFoodBtn";
import style from "./fav-food/AddFavFoodBtn.module.scss";

const FavArea = ({ favList, set }) => {

    const {openModal} = useModal();

    const modalHandler = () => {
        openModal('favAreaEdit', {type: 'customer'});
    }

    const clickHandler = async (type, value) => {
        const payload = {
            type,
            value
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
            set(prev => prev.filter((item) => item !== value));
        } else {
            const errorText = await res.text();
            console.error('Delete failed:', errorText);
        }
    }
    return (
        <div className={styles['edit-box']}>
            <div className={styles.title}>
                <h3 className={styles["title-text"]}>
                    <span> 선호지역 </span>
                    <div className={style.box} onClick={modalHandler}>
                        <FontAwesomeIcon className={style["plus-mark"]} icon={faPlus}/>
                    </div>
                        {/*<button onClick={modalHandler}> 추가하기 </button>*/}
                </h3>
            </div>
            <div className={styles['edit-wrapper']}>
                <ul className={styles.preferred} id="preferred-area">
                    {
                        favList.length > 0 &&
                        favList.map((item, idx) => {
                            return (
                                <li id={idx} key={idx}>
                                    <span>{item}</span>
                                    <FontAwesomeIcon
                                        className={styles.xmark} icon={faCircleXmark}
                                        onClick={() => clickHandler("area", item)}
                                    />
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default FavArea;