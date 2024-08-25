import React, {useEffect, useState} from 'react';
import styles from './SideBar.module.scss';
import {Link} from "react-router-dom";
import {CUSTOMER_URL} from "../../../config/host-config";
import {authFetch} from "../../../utils/authUtil";

const SideBar = ({isShow}) => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        if (isShow) document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isShow]);

    useEffect( () => {
        (async () => {
            const res = await authFetch(CUSTOMER_URL+'/stats', {
                headers: {
                    // 'Authorization' : 'Bearer ' +
                }
            });
            const data = await res.json();
            if (res.ok) {
                setStats(data);
            } else {
                alert("잠시 후 다시 이용해주세요");
            }
        })();
    }, []);
    return (
        <>
            <div className={`${styles.profile} ${isShow ? styles.on : undefined }`}>
                <h2>{stats.customerId || "test@test.com"}</h2>
                <ul className={styles.nav}>
                    <li>
                        <Link to={'/customer'} className={styles['nav-link']} >마이페이지</Link>
                    </li>
                    <li>
                        <Link to={'/customer/edit'} className={styles['nav-link']} >개인정보수정</Link>
                    </li>
                </ul>
                <div className={styles.stats}>
                    <div className={styles['stat-box']} id="carbon" >
                        <img src="/assets/img/mypage-carbon.png" alt="leaf"/>
                        <div>{stats.coTwo}kg의 이산화탄소 배출을 줄였습니다</div>
                    </div>
                    <div className={styles['stat-box']} id="community">
                        <img src="/assets/img/mypage-pigbank.png" alt="community"/>
                        <div>지금까지 {stats.money}원을 아꼈어요</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;