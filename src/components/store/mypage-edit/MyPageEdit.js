import React, {useEffect, useState} from 'react';
import styles from './MyPageEdit.module.scss';
import SideBar from "./SideBar";
import Edit from "./Edit";
import SideBarBtn from "./SideBarBtn";
import button from "bootstrap/js/src/button";

const MyPageEdit = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [show, setShow] = useState(false);
    const setInnerWidth = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", setInnerWidth);
        return () => {
            window.removeEventListener("resize", setInnerWidth);
        }
    }, );
    const showHandler = () => {
        setShow(prev => !prev);
    }
    return (
        <section>
            {width <= 400 && <SideBarBtn onShow={showHandler}/>}
            <div className={styles.container}>
                <SideBar isShow={show}/>
                <Edit/>
            </div>
        </section>
    );
};

export default MyPageEdit;