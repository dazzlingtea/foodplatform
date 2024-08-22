import ReactDOM from "react-dom";
import styles from "./SubModalPortal.module.scss";
import React, {useEffect, useRef} from "react";
import Spinner from "../../components/payment/Spinner";

const SubModalPortal = ({children, onClose, isLoading}) => {
    return ReactDOM.createPortal(
        <div className={styles.modal} id={"sub-modal"}>
            {
                isLoading ? <Spinner/> : (
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalInnerContent}>
                            {
                                isLoading ? <Spinner/> : children
                            }
                        </div>
                    </div>
                )
            }
        </div>
        , document.getElementById('sub-modal-root'));
};

export default SubModalPortal;