import React, {useRef, useState} from 'react';
import styles from "./Edit.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhone} from "@fortawesome/free-solid-svg-icons";
import {faSquareCheck} from "@fortawesome/free-regular-svg-icons";
import {STORE_URL} from "../../../config/host-config";
import {authFetch} from "../../../utils/authUtil";

const PhoneNumber = ({value}) => {
    const [err, setErr] = useState(false);
    const inputRef = useRef();

    const clickHandler = async () => {
        const payload = {
            type: "store_contact",
            value: inputRef.current.value
        }
        const res = await authFetch(STORE_URL + '/edit', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });
        if (res.ok) {
            alert("가게 전화번호가 업데이트 되었습니다.");
            setErr(false);
        } else {
            const errMsg = await res.text();
            setErr(true);
        }
    }
    return (
        <>
            <div className={styles["input-wrapper"]}>
                <div>
                    <div className={styles.icon}><FontAwesomeIcon icon={faPhone}/></div>
                    <span>전화번호</span>
                </div>
                <div>
                    <input id="business-number-input" min="1" ref={inputRef} defaultValue={value}/>
                    <FontAwesomeIcon className={styles["font-i"]} onClick={clickHandler} icon={faSquareCheck}/>
                </div>
            </div>
            { err &&
                <b style={{color: "red"}}>전화번호 입력값을 확인해주세요.</b>
            }
        </>
    );
};

export default PhoneNumber;