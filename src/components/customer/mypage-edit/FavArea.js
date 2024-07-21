import React, {useState} from 'react';
import styles from "./Edit.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {CUSTOMER_URL} from "../../../config/host-config";

const favList = [
    {id: 1, text: "서울시 마포구"},
    {id: 2, text: "서울시 용산구"},
    {id: 3, text: "서울시 서대문구"},
];
const customerId = "thdghtjd115@gmail.com";
const FavArea = () => {
    const [list, setList] = useState(favList);
    const clickHandler = async (type, value) => {
        const payload = {
            type,
            value
        }
        const res = await fetch(CUSTOMER_URL + `/${customerId}/delete`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([payload]),
        });
        if (res.ok) {
            alert("삭제되었습니다");
            console.log('Delete successful');
            setList(prev => prev.filter((item) => item.text !== value));
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
                </h3>
            </div>
            <div className={styles['edit-wrapper']}>
                <ul className={styles.preferred} id="preferred-area">
                    {
                        list.map((item, idx) => {
                            return (
                                <li id={idx} key={idx}>
                                    <span>{item.text}</span>
                                    <FontAwesomeIcon
                                        className={styles.xmark} icon={faCircleXmark}
                                        onClick={() => clickHandler("preferredArea", item.text)}
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