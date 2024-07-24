import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function VerifyToken() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        console.log('token : ', token);
        try {
          const response = await fetch('/email/verifyEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          if (data.success) {
            alert('Email verified successfully!');
          } else {
            alert('Email verification failed: ' + data.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div>
      Verifying your email...
    </div>
  );
}

export default VerifyToken;