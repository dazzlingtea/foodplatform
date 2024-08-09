
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styles from './LoginForm.module.scss';
import commonStyles from '../../common.module.scss';
import _ from "lodash";
import {checkLoggedIn} from "../../utils/authUtil";

const LoginForm = ({ userType, onVerificationSent }) => {
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);
    const [isExistingUser, setIsExistingUser] = useState(false);
    const [isSending, setIsSending] = useState(false);

    /**
     * auth util
     * 토큰 유무에 따른 로그인 페이지 리다이렉션 메서드
     */
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        checkLoggedIn(navigate, location.pathname);
    }, [navigate, location.pathname]);

    const checkEmailInput = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const checkCustomerDupId = async (email) => {
        try {
            const response = await fetch(`/customer/check?email=${email}`);
            const result = await response.json();
            if (result) {
                console.log(`입력하신 이메일 [ ${email} ] 은 customer 회원입니다.`);
                setIsExistingUser(true);
                return true;
            } else {
                console.error(`입력하신 이메일 [ ${email} ] 은 customer 회원이 아닙니다.`);
                setIsExistingUser(false);
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    }

    const checkStoreDupId = async (email) => {
        try {
            const response = await fetch(`/store/check?email=${email}`);
            const result = await response.json();
            if (result) {
                console.log(`입력하신 이메일[ ${email} ]은 store 회원입니다... `);
                setIsExistingUser(true);
                return true;
            } else {
                console.error(`입력하신 이메일[ ${email} ]은 store 회원이 아닙니다. `);
                setIsExistingUser(false);
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

    // 인증 링크 메일 보내기 - 공용 (인증메일 보내기)
    const sendVerificationLinkForLogin = async (email) => {
        try {
            const response = await fetch(`/email/sendVerificationLink`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    userType,
                    purpose: 'signin'
                }),
            });
            if (response.ok) {
                console.log('이메일이 성공적으로 전달되었습니다.');
                return true;
            } else {
                console.error('Failed to send verification link');
                return false;
            }
        } catch (error) {
            console.error('Error sending verification Link:', error);
            return false;
        }
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);
        if (email.trim() === '') {
            setEmailValid(false);
            setIsExistingUser(false);
        } else if (checkEmailInput(email)) {
            debouncedCheckDupId(email);
        } else {
            setEmailValid(false);
        }
    };

    const debouncedCheckDupId = _.debounce(async (email) => {
        console.log(`Checking duplication for: ${email}`);
        const isUnique = await checkDupId(email);
        setEmailValid(isUnique);
    }, 500);

    const handleSendVerificationLink = async (e) => {
        e.preventDefault();
        setIsSending(true);
        const isUnique = await checkDupId(email);
        if (!isUnique) {
            alert('입력하신 이메일은 회원이 아닙니다.');
            setIsSending(false);
            return;
        }
        if (isUnique) {
            const result = await sendVerificationLinkForLogin(email);
            if (result) {
                setVerificationSent(true);
                onVerificationSent(); // 상태를 부모 컴포넌트에 알림
                setIsSending(false);
            } else {
                alert('이메일 전송에 실패했거나 관련된 문제입니다.');
                setIsSending(false);
            }
        }
    };

    // 다른 이메일로 로그인 재시도
    const handleRetryLogin = () => {
        setVerificationSent(false);
        setEmail('');
        setEmailValid(false);
        setIsExistingUser(false);
    };

    return (
        <div className={styles['login-form']}>
            <section className={styles['input-area']}>
                <form onSubmit={handleSendVerificationLink}>
                    <div className={styles.container}>
                        {verificationSent ? (
                            <div className={styles['verify-link-sent']}>
                                <h2>{userType} 로그인 인증 링크가 아래의 이메일 주소로 발송되었습니다.</h2>
                                <p>[ {email} ]</p>
                                <p>이메일을 확인하여 로그인을 완료해주세요.</p>
                                <button className={isSending ? styles.disable : styles['resend-signup-email-btn']}
                                        onClick={handleSendVerificationLink}>

                                    {isSending ? "이메일 전송중..." :"이메일을 받지 못하셨나요? 재전송하기"}
                                </button>
                                <button className={styles['retry-sign-up']} onClick={handleRetryLogin}>
                                    다른 이메일 주소로 로그인
                                </button>
                            </div>
                        ) : (
                            <div className={styles['id-wrapper']}>
                                <h2>{userType} 로그인을 위한 이메일을 입력해주세요!
                                    {isExistingUser ? (
                                        <>
                                            <br /><br />
                                            환영해요 {email} 님 !
                                        </>
                                    ) : email.trim() === '' ? (
                                        <>
                                            <br /><br />
                                        </>
                                    ) : (
                                        <>
                                            <br /><br />
                                            입력하신 계정은 없는 계정입니다.
                                        </>
                                    )}
                                </h2>
                                <input
                                    type="text"
                                    id="input-id"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="이메일을 입력해주세요"
                                />
                                <button
                                    id="id-get-code-btn"
                                    className={(!emailValid ? styles.disable : '') || (isSending ? styles.disable : '')}
                                    // onClick={isExistingUser ? handleLoginRedirect : null}
                                >
                                    {isSending ? "이메일 전송중..." : (isExistingUser ? '로그인 인증메일 발송' : '로그인')}
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