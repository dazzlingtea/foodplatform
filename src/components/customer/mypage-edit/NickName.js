import React, {useEffect, useRef, useState} from 'react';
import styles from "./Edit.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhone, faUser} from "@fortawesome/free-solid-svg-icons";
import {faSquareCheck} from "@fortawesome/free-regular-svg-icons";
import {CUSTOMER_URL, STORE_URL} from "../../../config/host-config";
import {authFetch} from "../../../utils/authUtil";


const NickName = ({name}) => {
    const [target, setTarget] = useState(name);
    const [err, setErr] = useState(false);
    const inputRef = useRef();

    const clickHandler = async () => {
        const payload = {
            type: "nickname",
            value: inputRef.current.value
        }
        const res = await authFetch(CUSTOMER_URL + `/edit`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });
        if (res.ok) {
            alert("닉네임이 업데이트 되었습니다.");
            setErr(false);
            setTarget(inputRef.current.value);
        } else {
            const errMsg = await res.text();
            setErr(true);
        }
    }
    return (
        <>
            <div className={styles["input-wrapper"]}>
                <div className={styles.icon}><FontAwesomeIcon icon={faUser}/></div>
                <div>
                    <input min="1" ref={inputRef} defaultValue={name}/>
                    <FontAwesomeIcon onClick={clickHandler} icon={faSquareCheck}/>
                </div>
            </div>
            {err &&
                <b style={{color: "red"}}>닉네임 입력값을 확인해주세요.</b>
            }
        </>
    );
};

export default NickName;