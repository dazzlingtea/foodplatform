import styles from './SideBar.module.scss';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {STORE_URL} from "../../../config/host-config";
import {authFetch} from "../../../utils/authUtil";

const SideBar = ({isShow}) => {
    const [data, setData] = useState({});

    useEffect(() => {
        (async () => {
            const res = await authFetch(STORE_URL + '/stats', {
                headers: {
                    // 'Authorization' : 'Bearer ' +
                }
            });
            const data = await res.json();
            if (res.ok) {
                setData(data);
                console.log(data);
            } else {
                alert("잠시 후 다시 이용해주세요");
            }
        })();
    }, []);
    return (
        <>
            <div className={styles.backdrop}></div>
            <div className={`${styles.profile} ${isShow ? styles.on : undefined}`}>
                <ul className={styles.nav}>
                    <li>
                        <Link to={'/store'} className={styles['nav-link']}>마이페이지</Link>
                    </li>
                    <li>
                        <Link to={'/store/edit'} className={styles['nav-link']}>개인정보수정</Link>
                    </li>
                </ul>
                <div className={styles.stats}>
                    <div id="carbon">
                        <img src="/assets/img/mypage-carbon.png" alt="leaf"/>
                        <div>{data.coTwo}kg의 이산화탄소 배출을 줄였습니다</div>
                    </div>
                    <div id="community">
                        <img src="/assets/img/mypage-community.png" alt="community"/>
                        <div>지금까지 {data.customerCnt}명의 손님을 만났어요</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;