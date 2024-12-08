// SidebarModal.js
import React, {useState} from 'react';
import styles from './SidebarModal.module.scss'; // 스타일 파일을 추가해야 합니다
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/authUtil';
import { logoutAction } from "../../utils/authUtil";

const SidebarModal = ({ onClose }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutAction(navigate);
        setIsAuthenticated(false);
        navigate('/sign-in');
    };

    return (
        <div className={styles.modal}>
            <button className={styles.closeButton} onClick={onClose}>X</button>
            <div className={styles.content}>
                <button className={styles.logoutButton} onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
    );
};

export default SidebarModal;