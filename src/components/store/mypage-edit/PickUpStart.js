import React, {useEffect, useRef, useState} from 'react';
import styles from "./Edit.module.scss";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareCheck} from "@fortawesome/free-regular-svg-icons";
import {STORE_URL} from "../../../config/host-config";
import {authFetch} from "../../../utils/authUtil";

const PickUpStart = ({value}) => {
    const [err, setErr] = useState(false);
    const inputRef = useRef();
    const clickHandler = async () => {
        const payload = {
            type: "openAt",
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
            alert("픽업 시작 시간이 업데이트 되었습니다.");
        } else {
            const errMsg = await res.text();
            setErr(true);
            alert(errMsg);
        }
    }
    return (
        <>
            <div className={styles["input-wrapper"]}>
                <div className={styles.icon}><FontAwesomeIcon icon={faClock}/></div>
                <div>
                    <span>픽업 시작 시간</span>
                    <input type={"time"} ref={inputRef} defaultValue={value}/>
                    <FontAwesomeIcon onClick={clickHandler} icon={faSquareCheck}/>
                    {err &&
                        <b id="error-message" style={{color: "red"}}>
                            픽업 시작 시간은 픽업 마감 시간보다 늦을 수 없습니다.
                        </b>
                    }
                </div>
            </div>
        </>
    );
};

export default PickUpStart;