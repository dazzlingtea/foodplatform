import React, {useRef, useState} from 'react';
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareCheck} from "@fortawesome/free-regular-svg-icons";
import styles from './Edit.module.scss';
import {STORE_URL} from "../../../config/host-config";
import {authFetch} from "../../../utils/authUtil";

const PickUpEnd = ({ value }) => {
    const [err, setErr] = useState(false);
    const inputRef = useRef();
    const clickHandler = async () => {
        const payload = {
            type: "closedAt",
            value: inputRef.current.value,
        }
        const res = await authFetch(STORE_URL + '/edit', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            alert("픽업 마감 시간이 업데이트 되었습니다.");
        } else {
            const errMsg = await res.text();
            alert(errMsg);
        }
    }
    return (
        <div className={styles["input-wrapper"]}>
            <div>
                <div className={styles.icon}><FontAwesomeIcon icon={faClock}/></div>
                <span>마감 시간</span>
            </div>
            <div>
                <input type={"time"} ref={inputRef} defaultValue={value}/>
                <FontAwesomeIcon className={styles["font-i"]} onClick={clickHandler} icon={faSquareCheck}/>
            </div>
        </div>
    );
};

export default PickUpEnd;