import React from 'react';
import {useNavigate} from "react-router-dom";
import styles from "./WaitingApproval.module.scss";
import {GoArrowRight} from "react-icons/go";
import loadingSpinner from '../../assets/approval-img/loadingspinner.gif'

// 승인 대기 시 보여줄 페이지
const WaitingApproval = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate('/main');
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>승인 대기 중</h2>
      <img className={styles.spinner} src={loadingSpinner} alt={'로딩 중'} />
      <div className={styles.text}>
        <div>{`입력하신 정보를 관리자가 검토 후 승인 예정입니다.`}</div>
        <div>{`이 과정은 최소 5분 정도 소요될 수 있습니다.`}</div>
        <div>{`그동안 푸디트리를 구경하시는 건 어떨까요?`}</div>
      </div>
      <button className={styles.linkBtn} onClick={clickHandler}>
        {'푸디트리 둘러보기  '}
        <GoArrowRight />
      </button>
    </div>
  );
};

export default WaitingApproval;