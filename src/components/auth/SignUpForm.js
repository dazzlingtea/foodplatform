// SignUpForm.jsx
import React, { useState } from 'react';
import styles from './SignUpForm.module.scss';
import commonStyles from '../../common.module.scss';
import _ from 'lodash';



const SignUpForm = ({ userType, onSignUp, onResendEmail, onVerificationSent }) => {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const checkEmailInput = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkDupId = async (email) => {
    try {
      //fetch
      const result = false; // 더미 값: 이메일이 유효하다고 가정
      return !result;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };

  const sendVerificationLinkForSignUp = async (email) => {
    try {
      //fetch
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
    const result = await sendVerificationLinkForSignUp(email);
    setIsLoading(false);
    if (result) {
      setVerificationSent(true);
      onVerificationSent(); // 상태를 부모 컴포넌트에 알림
    } else {
      alert('잠시 후 다시 시도해주세요.');
    }
  };

  const handleRetrySignUp = () => {
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
      <div className={styles['sign-up-form']}>
        <section className={styles['input-area']}>
          <form onSubmit={handleSendVerificationLink}>
            <div className={styles.container}>
              {verificationSent ? (
                  <div className={styles['verify-link-sent']}>
                    <h2>{userType} 회원 등록을 위한 인증 링크가 이메일로 발송되었습니다.</h2>
                    <p> [ {email} ] </p>
                    <p>이메일을 확인하여 인증을 완료해주세요.</p>
                    <button className={styles['resend-signup-email-btn']} onClick={onResendEmail}>
                      이메일을 받지 못하셨나요? 재전송하기
                    </button>
                    <button className={styles['retry-sign-up']} onClick={handleRetrySignUp}>
                      다른 이메일 주소로 회원가입
                    </button>
                  </div>
              ) : (
                  <div className={styles['id-wrapper']}>
                    <h2>{userType} 회원 등록을 위한 이메일을 입력해주세요!</h2>
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
                      회원가입 인증메일 발송
                    </button>
                  </div>
              )}
            </div>
          </form>
        </section>
      </div>
  );
};

export default SignUpForm;