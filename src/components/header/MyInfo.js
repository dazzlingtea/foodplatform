import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faStore } from "@fortawesome/free-solid-svg-icons";
import styles from "./MyInfo.module.scss";
import { useNavigate } from "react-router-dom";
import {getRefreshToken, getSubName, getToken, getUserRole} from "../../utils/authUtil";
import Notification from "../notification/Notification";
import {BACK_HOST, BASE_URL, LOCAL_HOST, USER_URL} from "../../config/host-config";

// 내 정보 들어가기
const MyInfo = () => {
    const [userInfo, setUserInfo] = useState(null); // 사용자 정보를 저장할 상태
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`${USER_URL}/info`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ` + getToken(),
                        "refreshToken" : getRefreshToken()
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    // console.log("fetched userInfo data : ", data);

                    // 유저 타입에 따라 다른 키와 값을 로컬 스토리지에 저장
                    if (getUserRole() === 'store') {
                        localStorage.setItem('userImage', data.productImg);
                    } else if (getUserRole() === 'customer') {
                        localStorage.setItem('userImage', data.profileImage);
                    } else if (getUserRole() === 'store') {
                        localStorage.setItem('userImage', data.profileImage);
                    }

                    // 닉네임이 null 일 경우 저장하지 않음
                    if (getSubName() !== null) {
                        localStorage.setItem('subName', data.subName);
                    }

                    setUserInfo(data);
                    console.log("헤더에 저장된 유저 정보 : ", userInfo);
                } else {
                    console.error("Failed to fetch user info");
                }
            } catch (error) {
                console.error("Error fetching user info", error);
            }
        };

        fetchUserInfo();
    }, []); // 빈 배열로 설정해 컴포넌트가 마운트될 때 한 번만 호출되도록 함

    const handleIconClick = (path) => {
        navigate(path);
    };

    if (!userInfo) {
        return null; // 로딩 중이거나 정보가 없을 때는 아무것도 렌더링하지 않음
    }

    return (
        <div className={styles.myInfoContainer}>
            <span className={styles.myInfo}>
                {/*안녕하세요 {getSubName() ? getSubName() : userInfo.email}님!*/}
            </span>
            <div className={styles.myIconContainer}>
                {getUserRole() === 'store' ? (
                    <>
                        {/* Store 아이콘과 프로필 이미지 */}
                        <Notification email={userInfo.email} role={getUserRole()} />
                        <img
                            src={userInfo.storeImg}
                            alt="Store Profile"
                            className={styles.profileImage}
                            onClick={() => handleIconClick("/store")}
                        />
                    </>
                ) : getUserRole() === 'customer' ? (
                    <>
                        {/* Customer 아이콘과 프로필 이미지 */}
                        <Notification email={userInfo.email} role={getUserRole()} />
                        <img
                            src={`${BASE_URL}` + userInfo.profileImage}
                            alt="Customer Profile"
                            className={styles.profileImage}
                            onClick={() => handleIconClick("/customer")}
                        />
                    </>
                ) : getUserRole() === 'admin' ? (
                    <>
                        {/* Admin 아이콘과 프로필 이미지 */}
                        <Notification email={userInfo.email} role={getUserRole()} />
                        <img
                            src={`${BASE_URL}` + userInfo.profileImage}
                            alt="Customer Profile"
                            className={styles.profileImage}
                            onClick={() => handleIconClick("/admin")}
                        />
                        <span className={styles.admin}>ADMIN</span>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default MyInfo;