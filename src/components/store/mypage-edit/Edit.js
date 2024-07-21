import styles from './Edit.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faClock, faPhone, faDollarSign, faKey, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {faSquareCheck} from "@fortawesome/free-regular-svg-icons";
import ProfileImgBtn from "./ProfileImgBtn";
import PickUpStart from "./PickUpStart";
import PickUpEnd from "./PickUpEnd";
import ProductCount from "./ProductCount";
import PhoneNumber from "./PhoneNumber";
import ProductPrice from "./ProductPrice";
import PasswordReset from "./PasswordReset";

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
                        <div className={styles["input-wrapper"]}>
                            <div className={styles.icon}><FontAwesomeIcon icon={faUser}/></div>
                            <span>상호명</span>
                            <div id="store-name-mypage-edit">가게이름</div>
                        </div>
                        <div className={styles["input-wrapper"]}>
                            <div className={styles.icon}><FontAwesomeIcon icon={faUser}/></div>
                            <span>이메일</span>
                            <span id="store-id-mypage-edit">이메일주소</span>
                        </div>
                        <PickUpStart/>
                        <PickUpEnd/>
                        <ProductCount/>
                        <PhoneNumber/>
                        <ProductPrice />
                    </div>
                    <ProfileImgBtn/>
                </div>
            </div>
        </div>
    );
};

export default Edit;