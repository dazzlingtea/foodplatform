import React from 'react';
import styles from './Edit.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faUser,
    faClock,
    faPhone,
    faDollarSign,
    faKey,
    faPenToSquare,
    faCircleXmark
} from "@fortawesome/free-solid-svg-icons";
import {faSquareCheck} from "@fortawesome/free-regular-svg-icons";
import ProfileImgBtn from "./ProfileImgBtn";
import PhoneNumber from "./PhoneNumber";
import NickName from "./NickName";
import PasswordReset from "./PasswordReset";
import FavArea from "./FavArea";
import FavFood from "./FavFood";
import FavStore from "./FavStore";

const Edit = () => {
    return (
        <div className={styles.edit}>
            <div className={styles['edit-box']}>
                <div className={styles.title}>
                    <h3 className={styles["title-text"]}>
                        <span> 내 프로필 </span>
                    </h3>
                </div>
                <div className={styles['edit-wrapper']}>
                    <div className={styles["input-area"]}>
                        <NickName/>
                        <PhoneNumber/>
                    </div>
                    <ProfileImgBtn/>
                </div>
            </div>
            <FavArea/>
            <FavFood/>
            <FavStore/>

        </div>
    );
};

export default Edit;