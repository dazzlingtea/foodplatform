// components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.scss';
import commonStyles from '../../common.module.scss';
import _ from "lodash";

const LoginForm = ({ userType, onResendEmail, onVerificationSent }) => {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // const BASE_URL = window.location.origin;

  const checkEmailInput = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 새로운 아이디 -> 중복검사 후 no -> 회원가입하기로 유도
  const checkDupId = async (email) => {
    try {
      // const response = await fetch(`${BASE_URL}/store/check?type=account&keyword=${email}`);
      // const result = await response.json();
      const result = false; // 더미 값: 이메일이 유효하다고 가정
      return !result;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };

  const sendVerificationLinkForLogin = async (email) => {
    try {
      // const response = await fetch(`${restfulapi~}/email/sendVerificationLink`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email,
      //     purpose: 'signup',
      //   }),
      // });
      const response = { ok: true }; // 더미 값: 요청이 성공했다고 가정
      return response.ok;
    } catch (error) {
      console.error('Error sending verification link:', error);
      return false;
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (checkEmailInput(email)) {
      debouncedCheckDupId(email);
    } else {
      setEmailValid(false);
    }
  };

  const debouncedCheckDupId = _.debounce(async (email) => {
    console.log(`Checking duplication for: ${email}`);
    const isUnique = await checkDupId(email);
    setEmailValid(isUnique);
  }, 1000);


  const handleSendVerificationLink = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await sendVerificationLinkForLogin(email);
    setIsLoading(false);
    if (result) {
      setVerificationSent(true);
      onVerificationSent(); // 상태를 부모 컴포넌트에 알림
    } else {
      alert('잠시 후 다시 시도해주세요.');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //실제 로그인 요청 코드
      /*
      const response = await fetch(`${restfulapi~}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const result = await response.json();
        onLogin(result);
        navigate(userType === 'customer' ? '/customer' : '/store');
      } else {
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      }
      */

      // 로그인 성공을 가정하는 임시 코드
      console.log('Logging in with:', { email });
      navigate(userType === 'customer' ? '/customer' : '/store');
    } catch (error) {
      console.error('Login error:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleRetryLogin = () => {
    console.log('Before resetting state:');
    console.log('verificationSent:', verificationSent);
    console.log('email:', email);
    console.log('emailValid:', emailValid);

    setVerificationSent(false);
    setEmail('');
    setEmailValid(false);


    console.log('After resetting state:');
    console.log('verificationSent:', verificationSent);
    console.log('email:', email);
    console.log('emailValid:', emailValid);

  };


  return (
    <div className={styles['login-form']}>
      <section className={styles['input-area']}>
        <form onSubmit={handleSendVerificationLink}>
          <div className={styles.container}>
            {verificationSent ? (
                <div className={styles['verify-link-sent']}>
                  <h2>{userType} 로그인 인증 링크가 아래의 이메일 주소로 발송되었습니다.</h2>
                  <p> [ {email} ] </p>
                  <p>이메일을 확인하여 로그인을 완료해주세요.</p>
                  <button className={styles['resend-login-email-btn']} onClick={onResendEmail}>
                    이메일을 받지 못하셨나요? 재전송하기
                  </button>
                  <button className={styles['retry-sign-up']} onClick={handleRetryLogin}>
                    다른 이메일 주소로 로그인
                  </button>
                </div>
            ) : (
                <div className={styles['id-wrapper']}>
                  <h2>{userType} 로그인을 위한 이메일 주소를 입력해주세요!</h2>
                  <input
                      type="text"
                      id="input-id"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="이메일을 입력해주세요"
                  />
                  <button
                      id="id-get-code-btn"
                      className={!emailValid ? styles.disable : ''}
                      disabled={!emailValid}
                  >
                    로그인 메일 발송
                  </button>
                </div>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default LoginForm;