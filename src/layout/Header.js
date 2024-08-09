import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import { logoutAction } from '../utils/authUtil'; // 로그아웃 액션 임포트
import styles from './Header.module.scss'; // 헤더 스타일 임포트

const Header = () => {
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
        <header>
            <h1>Header</h1>
            {isAuthenticated ? (
                <button onClick={handleLogout} className={styles.logoutButton}>
                    Log Out
                </button>
            ) : (
                <button onClick={() => navigate('/sign-in')} className={styles.loginButton}>
                    Log In
                </button>
            )}
        </header>
    );
};

export default Header;