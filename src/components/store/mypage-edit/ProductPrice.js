import React, {useRef, useState} from 'react';
import {STORE_URL} from "../../../config/host-config";
import {faSquareCheck} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from './Edit.module.scss';
import {faDollarSign} from "@fortawesome/free-solid-svg-icons";

const ProductPrice = () => {
    const [err, setErr] = useState(false);
    const selectRef = useRef();

    const clickHandler = async () => {
        const res = await fetch(STORE_URL + '/mypage/edit/update/price', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectRef.current.value),
        });
        if (res.ok) {
            alert("가격이 업데이트 되었습니다.");
            setErr(false);
        } else {
            const errMsg = await res.text();
            setErr(true);
        }
    }
    return (
        <div className={styles["input-wrapper"]}>
            <div className={styles.icon}>
                <FontAwesomeIcon icon={faDollarSign}/>
            </div>
            <span>스페셜박스 가격</span>
            <select id="price" ref={selectRef}>
                <option value="3900">3900</option>
                <option value="5900">5900</option>
                <option value="7900">7900</option>
            </select>
            <FontAwesomeIcon onClick={clickHandler} icon={faSquareCheck}/>
            { err &&
                <b style={{color: "red"}}></b>
            }
        </div>
    );
};

export default ProductPrice;