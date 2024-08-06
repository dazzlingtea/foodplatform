

// fetch 보내기 전 페이지에서 토큰 검증
export const checkAuthToken = async (navigate) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    if (token && refreshToken) {
        return { token, refreshToken };
    } else {
        alert("로그인이 필요한 서비스입니다.");
        navigate('/sign-in');
        return null;
    }
};

// 페치 보낼 때 서버측 토큰 에러 응답에 따른 토큰 검증
export const fetchWithAuth = async (url, options, navigate) => {
    try {
        const response = await fetch(url, options);
        if (response.status === 401) {
            alert("로그인이 필요한 서비스입니다.");
            navigate('/sign-in');
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Network or server error:', error);
        return null;
    }
};