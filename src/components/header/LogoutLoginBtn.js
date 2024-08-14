import React, {useEffect, useState} from 'react';
import styles from "../../layout/Header.module.scss";
import {useNavigate} from "react-router-dom";
import {logoutAction} from "../../utils/authUtil";

const LogoutLoginBtn = () => {

    const navigate = useNavigate(); // navigate 훅 사용
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = async () => {
        await logoutAction(navigate); // 로그아웃 액션 호출
        setIsAuthenticated(false); // 로그아웃 후 인증 상태 업데이트
    };
    return (
        <div>
            {isAuthenticated ? (
                <button onClick={handleLogout} className={styles.logoutButton}>
                    Log Out
                </button>
            ) : (
                <button onClick={() => navigate('/sign-in')} className={styles.loginButton}>
                    Log In
                </button>
            )}
        </div>
    );
};

export default LogoutLoginBtn;