import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {checkAuthToken} from "../../utils/authUtil";
import RegisterStep from "../../components/storeRegister/RegisterStep";

const StoreRegisterPage = () => {
  // console.log('가게-등록-페이지 실행!');
    /**
     * 토큰이 있으면 현재 페이지 유지
     * 토큰이 없으면 로그인 창 리다이렉션
     * 토큰의 usertype이 store과 같을 경우 현재 페이지 유지
     * 토큰의 usertype이 store과 다를 경우 메인 페이지 리다이렉션
     */
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = await checkAuthToken(navigate);
            if (userInfo) {
                const requiredRole = 'store'; // 필요한 role 작성
                if (userInfo.userType !== requiredRole) {
                    alert('접근 권한이 없습니다.');
                    navigate('/main');
                }
            }
        };
        fetchUser();
    }, [navigate]);


    return (
    <>
      <RegisterStep />
    </>
  );
};

export default StoreRegisterPage;
