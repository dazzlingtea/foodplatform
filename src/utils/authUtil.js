
import { jwtDecode } from 'jwt-decode';

export const checkAuthToken = async (navigate) => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("로그인이 필요한 서비스입니다.");
        navigate('/sign-in');
        return null;
    }
}

//로그인 창에서 토큰이 이미 있으면 customerMyPage, storeMyPage path 리다이렉션
export const checkLoggedIn = (navigate) => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("로그인이 안되어 있어요. 엑세스 토큰이 없어요 ~ ❌");
        navigate('/sign-in');
        return null;
    }

    try {
        const userInfo = jwtDecode(token);
        const userType = userInfo.role;
        const email = userInfo.sub;

        console.log("usertype : ", userType);
        console.log("로그인이 되어있어요 ~ ✅");

        if (userType === 'store') {
            alert(`안녕하세요 ${email}님 ! ${userType} 마이페이지에 접속합니다.`);
            navigate('/store');
        } else if (userType === 'customer') {
            alert(`안녕하세요 ${email}님 ! ${userType} 마이페이지에 접속합니다.`);
            navigate('/customer');
        }
    } catch (error) {
        console.error('Invalid token:', error);
        navigate('/sign-in');
    }
}

