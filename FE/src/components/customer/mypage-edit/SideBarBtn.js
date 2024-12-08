import React from 'react';
import styles from './SideBarBtn.module.scss';

const SideBarBtn = ({onShow}) => {
    const changeHandler = () => {
        onShow(prev => !prev);
    }
    return (
        <div id="menuToggle" className={styles.sidebarBtn}>
            <input onChange={changeHandler} className={styles.checkbox} id="checkbox" type="checkbox"/>
            <label className={styles.toggle} htmlFor="checkbox">
                <div className={`${styles.bar} ${styles["bar--top"]}`}></div>
                <div className={`${styles.bar} ${styles["bar--middle"]}`}></div>
                <div className={`${styles.bar} ${styles["bar--bottom"]}`}></div>
            </label>
        </div>
    );
};

export default SideBarBtn;