import { useLoaderData, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

function VerifyToken() {
  const data = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.email && data.userType) {
      const { email, userType, storeApprove } = data;
      localStorage.setItem('email', email);
      localStorage.setItem('userType', userType);

      const timeoutId = setTimeout(() => {
        let redirectPath;
        if (userType === 'store') {
          redirectPath = '/store/approval'; // store approve 가 없는 경우
          if (storeApprove) redirectPath = '/store' // store approve가 있는 경우
        } else if (userType === 'admin') {
          redirectPath = '/admin';
        } else {
          redirectPath = '/main';
        }
        navigate(redirectPath);
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [data, navigate]);

  return (
      <div>
        {data && data.email ? (
            <div>
              <p>Congratulations on completing your SIGN IN!</p>
              <p>Email verified successfully!</p>
              <p>Welcome, {data.email}!</p>
              <p>Your role is: {data.userType}</p>
            </div>
        ) : (
            <p>Verifying your email...</p>
        )}
      </div>
  );
}

export default VerifyToken;