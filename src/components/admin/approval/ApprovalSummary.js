import React from 'react';
import styles from './ApprovalSummary.module.scss';
import {useNavigate} from "react-router-dom";

const ApprovalSummary = ({stats}) => {

  const {PENDING, APPROVED, REJECTED} = stats;

  const navigate = useNavigate();

  const handleIssuePage = () => {
      navigate('/admin/issue');
  }

  return (
      <div className={styles['summary-container']}>
          <h2>스토어 등록 요청</h2>
          <div className={styles['summary-pending']}>
              <span>대기</span>
              <span>{PENDING || 0}</span>
          </div>
          <div className={styles['summary-approved']}>
              <span>승인</span>
              <span>{APPROVED || 0}</span>
          </div>
          <div className={styles['summary-rejected']}>
              <span>거절</span>
              <span>{REJECTED || 0}</span>
          </div>
          <div className={styles['summary-total']}>
              <span>총계</span>
              <span>{(PENDING || 0) + (APPROVED || 0) + (REJECTED || 0)}</span>
          </div>
          <h2 onClick={handleIssuePage}>고객 지원</h2>
      </div>
  );
};

export default ApprovalSummary;