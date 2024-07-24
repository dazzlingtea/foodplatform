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

  //customer
  // 새로운 아이디 -> 중복검사 후 no -> 회원가입하기로 유도
  const checkCustomerDupId = async (email) => {
    try {
      const response = await fetch(`/customer/check?type=account&keyword=${email}`);
      const result = await response.json();
      if (!result) {
        console.log(`입력하신 이메일 [ ${email} ] 은 customer 회원이 아닙니다.`);
          return true;
      } else {
        console.error(`입력하신 이메일 [ ${email} ] 은 customer 회원입니다.`);
          return false;
      }
  } catch (error) {
      console.error('Error:', error);
      return false;
  }
}

// store
// 새로운 아이디 -> 중복검사 후 no -> 회원가입하기로 유도
const checkStoreDupId = async (email) => {
    try {
      const response = await fetch(`/store/check?type=account&keyword=${email}`);
      const result = await response.json();
      if (!result) { //찾지 못하였으면
        console.log(`입력하신 이메일[ ${email} ]은 store 회원이 아닙니다. `);
          return true;
      } else {
        console.error(`입력하신 이메일[ ${email} ]은 store 회원입니다... `);
          return false;
      }
  } catch (error) {
      console.error('Error:', error);
      return false;
  }
}

//usertype에 따른 중복검사 진행
const checkDupId = async (email) => {
  switch (userType) {
    case 'customer':
      return await checkCustomerDupId(email);
    case 'store':
      return await checkStoreDupId(email);
    default:
      return false;
  }
};

// 인증 메일 리다이렉션 주소 보내기
const sendVerificationLinkForSignUp = async (email) => {
  try {
      const response = await fetch(`/email/sendVerificationLink`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email,
              purpose: 'signup'
          }),
      });
      if (response.ok) {
          console.log('이메일이 성공적으로 전달되었습니다.', email);
          return true;
      } else {
          console.error('Failed to send verification link');
          return false;
      }
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
  }, 100); // 로딩바 구현?

  const handleSendVerificationLink = async (e) => {
    e.preventDefault();
    const isUnique = await checkDupId(email);
    if (!isUnique) {
      alert('입력하신 이메일은 이미 회원입니다.');
      return;
    }
    if (isUnique) {
      setIsLoading(true);
      const result = await sendVerificationLinkForSignUp(email);
      setIsLoading(false);
      if (result) {
        setVerificationSent(true);
        onVerificationSent(); 
      } else {
        alert('이메일 전송에 실패했거나 관련된 문제입니다.');
      }
    }
  };

  // 다른 이메일로 로그인 재시도
const handleRetrySignUp = () => {
  setVerificationSent(false);
  setEmail('');
  setEmailValid(false);
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
                    <button className={styles['resend-signup-email-btn']} onClick={handleSendVerificationLink}>
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