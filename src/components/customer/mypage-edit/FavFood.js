import React, {useState} from 'react';
import styles from "./Edit.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {CUSTOMER_URL} from "../../../config/host-config";

const favList = [
    {id: 1, text: "양식", img: "/assets/img/western.jpg"},
    {id: 2, text: "한식", img: "/assets/img/korean.jpg"},
    {id: 3, text: "중식", img: "/assets/img/chinese.jpg"},
]
const customerId = "thdghtjd115@gmail.com";
const FavFood = () => {
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
                    <span> 선호음식 </span>
                </h3>
            </div>
            <div className={styles['edit-wrapper']}>
                <ul className={styles.preferred} id="preferred-area">
                    {
                        list.map((item, idx) => {
                            return (
                                <li id={idx} key={idx}>
                                    <div className={styles["img-box"]}>
                                        <img src={item.img} alt="선호음식이미지"/>
                                    </div>
                                    <span>{item.text}</span>
                                    <FontAwesomeIcon
                                        className={styles.xmark} icon={faCircleXmark}
                                        onClick={() => clickHandler("preferredFood", item.text)}
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

export default FavFood;