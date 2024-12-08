import React from 'react';
import spinnerS from '../../assets/approval-img/spinner_s.gif'
import styles from './RegisterStepSpinner.module.scss'

const RegisterStepSpinner = () => {
  return (
    <div className={styles.spinnerBox}>
      <span>로딩 중</span>
      <img className={styles.spinner} src={spinnerS} alt=""/>
    </div>
  );
};

export default RegisterStepSpinner;