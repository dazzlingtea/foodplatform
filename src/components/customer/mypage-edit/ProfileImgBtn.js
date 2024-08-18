import React, {useEffect, useRef, useState} from 'react';
import styles from "./ProfileImgBtn.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {CUSTOMER_URL} from "../../../config/host-config";
import {DEFAULT_IMG, imgErrorHandler} from "../../../utils/error";
import {authFetch} from "../../../utils/authUtil";

const ProfileImgBtn = ({profileImg}) => {
    const inputRef = useRef();
    const [img, setImg] = useState(null);
    const [isShow, setIsShow] = useState(false);
    const [file, setFile] = useState(null);

    const openFileHandler = () => {
        inputRef.current.click();
    }

    const onChangeHandler = () => {
        const selected = inputRef.current.files[0];
        if (selected) {
            setFile(selected);
            setIsShow(true);
        } else {
            setFile(null);
            setIsShow(false);
        }
    }

    const onClickHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('customerImg', file);
        const response = await authFetch(CUSTOMER_URL + '/edit/img', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            alert("프로필 이미지가 성공적으로 업데이트 되었습니다.");
            setIsShow(false);
        } else {
            const errMsg = await response.text();
            alert(errMsg);
        }
    }

    useEffect(() => {
        if (file) {
            const target = URL.createObjectURL(inputRef.current.files[0]);
            setImg(target);
            return () => URL.revokeObjectURL(target);
        } else {
            setImg(null);
            setIsShow(false);
        }
    }, [file]);

    return (
        <div className={styles["image-wrapper"]}>
            <input
                ref={inputRef}
                type="file"
                name="profileImage"
                id="profileImage"
                accept="image/*"
                style={{display: "none"}}
                onChange={onChangeHandler}
            />
            <a onClick={openFileHandler} className={styles.avatar}>
                <FontAwesomeIcon className={styles.i} icon={faPenToSquare}/>
                <img
                    src={img || (profileImg || DEFAULT_IMG)}
                    onError={imgErrorHandler}
                    alt="Customer profile image"/>
            </a>
            {
                isShow && <button className={styles.btn} onClick={onClickHandler}>이미지 변경</button>
            }
        </div>
    );
};

export default ProfileImgBtn;