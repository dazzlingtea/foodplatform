import React, {useEffect, useState} from 'react';
import SignUpForm from '../../components/auth/SignUpForm';
import styles from './SignUpPage.module.scss';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {checkLoggedIn} from "../../utils/authUtil";

const SignUpPage = () => {
  const [userType, setUserType] = useState('customer'); // 기본 상태값 customer
  const [verificationSent, setVerificationSent] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // URL의 쿼리 파라미터를 통해 역할을 처리
    const params = new URLSearchParams(location.search);
    const role = params.get('r');

    if (role === 'guest') {
      // 토큰 존재 여부 확인
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');

      if (token && refreshToken) {
        // 토큰이 존재할 경우
        alert("입점신청 시 로그아웃 후 신청이 진행됩니다.");
        localStorage.removeItem('token');
        sessionStorage.removeItem('refreshToken');
        setUserType('store');  // userType을 store로 설정
      }
      setUserType('store');  // userType을 store로 설정

      // 로그인 체크
      checkLoggedIn(navigate, location.pathname);
    } else {
      // role이 'guest'가 아닐 경우 그냥 로그인 체크
      checkLoggedIn(navigate, location.pathname);
    }
  }, [navigate, location.pathname]);


  // user type 상태관리
  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const handleSignUp = (email, userType) => {
    console.log('User Sign Up:', email, userType);
    // 여기서 userType을 백엔드에 전달하여 처리
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
                  {/* <button
                      className={`${styles['user-type-button']} ${
                          userType === 'admin' ? styles.active : ''
                      }`}
                      onClick={() => handleUserTypeChange('admin')}
                  >
                    Admin
                  </button> */}
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