// pages/auth/EmailVerificationPage.jsx
import React from 'react';

const EmailVerificationPage = () => {
  return (
    <div className="verification-page">
      <div className="verification-message">
        <h2>인증 링크가 이메일로 발송되었습니다.</h2>
        <p>이메일을 확인하여 인증을 완료해주세요.</p>
      </div>
    </div>
  );
};

export default EmailVerificationPage;