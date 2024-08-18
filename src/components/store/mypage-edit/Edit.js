import styles from './Edit.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import ProfileImgBtn from "./ProfileImgBtn";
import PickUpStart from "./PickUpStart";
import PickUpEnd from "./PickUpEnd";
import ProductCount from "./ProductCount";
import PhoneNumber from "./PhoneNumber";
import ProductPrice from "./ProductPrice";
import {useEffect, useState} from "react";
import {STORE_URL} from "../../../config/host-config";
import {authFetch} from "../../../utils/authUtil";

const Edit = () => {
    const [data, setData] = useState({});
    useEffect(() => {
        (async () => {
            const res = await authFetch(STORE_URL + '/info', {
                headers: {
                    // 'Authorization' : 'Bearer ' +
                }
            });
            if (res.ok) {
                const data = await res.json();
                setData(data);
                console.log(data);
            } else {
                alert("잠시후 다시 이용해주세요");
            }
        })();
    }, []);
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
                        <div className={styles["input-wrapper"]}>
                            <div>
                                <div className={styles.icon}><FontAwesomeIcon icon={faUser}/></div>
                                <span>상호명</span>
                            </div>
                            <div id="store-name-mypage-edit">{data.storeName}</div>
                        </div>
                        <div className={styles["input-wrapper"]}>
                            <div>
                                <div className={styles.icon}><FontAwesomeIcon icon={faUser}/></div>
                                <span>이메일</span>
                            </div>
                            <span id="store-id-mypage-edit">{data.storeId}</span>
                        </div>
                        <PickUpStart value={data.openAt}/>
                        <PickUpEnd value={data.closedAt}/>
                        <ProductCount value={data.productCnt}/>
                        <PhoneNumber value={data.storeContact}/>
                        <ProductPrice value={data.price}/>
                    </div>
                    <ProfileImgBtn value={data.storeImg}/>
                </div>
            </div>
        </div>
    );
};

export default Edit;