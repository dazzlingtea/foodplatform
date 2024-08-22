import React from 'react';
import {useNavigate} from "react-router-dom";
import styles from '../approval/ApprovalSummary.module.scss';
const IssueSummary = ({stats}) => {

    const {PENDING, SOLVED, CANCELLED} = stats;

    const navigate = useNavigate();
    const handleAdminPage = () => {
        navigate('/admin');
    }

    return (
        <div className={styles['summary-container']}>
            <h2>고객 지원</h2>
            <div className={styles['summary-pending']}>
                <span>대기</span>
                <span>{PENDING || 0}</span>
            </div>
            <div className={styles['summary-approved']}>
                <span>해결</span>
                <span>{SOLVED || 0}</span>
            </div>
            <div className={styles['summary-rejected']}>
                <span>취소</span>
                <span>{CANCELLED || 0}</span>
            </div>
            <div className={styles['summary-total']}>
                <span>총계</span>
                <span>{(PENDING || 0) + (SOLVED || 0) + (CANCELLED || 0)}</span>
            </div>
            <h2 className={styles.H2otherPage} onClick={handleAdminPage}>스토어 등록 요청</h2>
        </div>
    );
};

export default IssueSummary;