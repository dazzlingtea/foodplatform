import { useNavigate } from 'react-router-dom';
import {EMAIL_URL} from "../config/host-config";

export const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return false;
    }
    return true;

    // try {
    //     const response = await fetch(`/email/verifyEmail`, {
    //         headers: { 'Authorization': 'Bearer ' + token },
    //         method: 'POST',
    //     });
    //
    //     if (response.ok) {
    //        return true;
    //     } else {
    //         return alert("엑세스 토큰 기한이 만료되었습니다. 재로그인 해주세요 (자동로그인 구현중이에요)");
    //     }
    // } catch (error) {
    //     console.error("Error verifying token:", error);
    //     return false;
    // }
};

export const handleInvalidToken = (navigate) => {
    alert("로그인이 필요한 서비스입니다.");
    navigate('/sign-in');
};