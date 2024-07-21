import React from 'react';
import {faKey} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from './Edit.module.scss'

const PasswordReset = () => {
    // const { openModal } = useModal();
    return (
        <div className={styles["input-wrapper"]}>
            <div className={styles.icon}>
                <FontAwesomeIcon icon={faKey}/>
            </div>
            <button id="reset-pw-btn">비밀번호 재설정</button>
        </div>
    );
};

export default PasswordReset;