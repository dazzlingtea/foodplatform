import React, { useState } from 'react'
import LoginForm from '../../components/auth/LoginForm'
import styles from './LoginPage.module.scss'
import {Link} from "react-router-dom";

const LoginPage = () => {
  const [userType, setUserType] = useState('customer'); //기본 상태값 customer
  const [verificationSent, setVerificationSent] = useState(false);


  // user type 상태관리
  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const handleResendEmail = () => {
  };

  // 이메일 발송 후 사용자 유형 변경 방지
  const handleVerificationSent = () => {
    setVerificationSent(true);
  };

  return (
      <div className={styles['login-page']}>
          <div className={styles.container}>
            <div className={styles['login-section']}>
              {!verificationSent && ( // 이메일 발송 후 사용자 유형 버튼 숨기기
                  <div className={styles['user-type-buttons']}>
                      <button
                          className={`${styles['user-type-button-customer']} ${styles['user-type-button']}  ${
                              userType === 'customer' ? styles.active : ''
                          }`}
                          onClick={() => handleUserTypeChange('customer')}
                      >
                          Customer
                      </button>
                      <button
                          className={`${styles['user-type-button-store']} ${styles['user-type-button']} ${
                              userType === 'store' ? styles.active : ''
                          }`}
                          onClick={() => handleUserTypeChange('store')}
                      >
                          Store
                      </button>
                      {/* <button
                          className={`${styles['user-type-button-admin']} ${styles['user-type-button']} ${
                              userType === 'admin' ? styles.active : ''
                          }`}
                          onClick={() => handleUserTypeChange('admin')}
                      >
                          Admin
                      </button> */}
                  </div>
              )}
                <LoginForm
                    userType={userType}

                    onResendEmail={handleResendEmail}
                    onVerificationSent={handleVerificationSent}
                    verificationSent={verificationSent} // verificationSent 상태 전달
                />
                <div className={'sub-wrapper'}>
              <Link className={styles['sub-sign-up']} to="/sign-up">
                sign up 🌱
                </Link>
                
                <div
              className={`${styles['user-type-button-admin']} ${styles['user-type-button']} ${styles.admin} ${
                userType === 'admin' ? styles.active : ''
              }`}
              onClick={() => handleUserTypeChange('admin')}
            >
              Admin
            </div>

              </div>
            </div>
          </div>
      </div>
  );
};


export default LoginPage;