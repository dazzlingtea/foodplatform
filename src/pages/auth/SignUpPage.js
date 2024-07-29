import React, { useState } from 'react';
import SignUpForm from '../../components/auth/SignUpForm';
import styles from './SignUpPage.module.scss';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [userType, setUserType] = useState('customer'); // 기본 상태값 customer
  const [verificationSent, setVerificationSent] = useState(false);

  // user type 상태관리
  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const handleSignUp = (email, password) => {
    console.log('User Sign Up:', email, password);
  };

  const handleResendEmail = () => {
    console.log('이메일 재전송 버튼 누름 !');
  };

  // 이메일 발송 후 사용자 유형 변경 방지
  const handleVerificationSent = () => {
    setVerificationSent(true);
  };


  return (
      <div className={styles['sign-up-page']}>
        <div className={styles.container}>
          <div className={styles['logo']}>FoodieTree</div>
          <div className={styles['sign-up-section']}>
            {!verificationSent && ( // 이메일 발송 후 사용자 유형 버튼 숨기기
                <div className={styles['user-type-buttons']}>
                  <button
                      className={`${styles['user-type-button']} ${
                          userType === 'customer' ? styles.active : ''
                      }`}
                      onClick={() => handleUserTypeChange('customer')}
                  >
                    Customer
                  </button>
                  <button
                      className={`${styles['user-type-button']} ${
                          userType === 'store' ? styles.active : ''
                      }`}
                      onClick={() => handleUserTypeChange('store')}
                  >
                    Store
                  </button>
                </div>
            )}
            <SignUpForm
                userType={userType}
                onSignUp={handleSignUp}

                onResendEmail={handleResendEmail}
                onVerificationSent={handleVerificationSent}
                verificationSent={verificationSent} // verificationSent 상태 전달
            />
            <div className={'sub-wrapper'}>
              <Link className={styles['sub-login']} to="/sign-in">
                sign in 🌱
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SignUpPage;