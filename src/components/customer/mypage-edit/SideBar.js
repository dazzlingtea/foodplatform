import React, {useEffect} from 'react';
import styles from './SideBar.module.scss';
import {Link} from "react-router-dom";

const SideBar = ({isShow}) => {

    useEffect(() => {
        if (isShow) document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isShow]);
    return (
        <>
            <div className={`${styles.profile} ${isShow ? styles.on : undefined }`}>
                <h2>xxxx@xxxx.com</h2>
                <ul className={styles.nav}>
                    <li>
                        <Link to={'/customer'} className={styles['nav-link']} >마이페이지</Link>
                    </li>
                    <li>
                        <Link to={'/customer/edit'} className={styles['nav-link']} >개인정보수정</Link>
                    </li>
                </ul>
                <div className={styles.stats}>
                    <div id="carbon" >
                        <img src="/assets/img/mypage-carbon.png" alt="leaf"/>
                        <div>kg의 이산화탄소 배출을 줄였습니다</div>
                    </div>
                    <div id="community">
                        <img src="/assets/img/mypage-pigbank.png" alt="community"/>
                        <div>지금까지 xxx원을 아꼈어요</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;