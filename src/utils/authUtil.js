

export const checkAuthToken = async (navigate) => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("로그인이 필요한 서비스입니다.");
        navigate('/sign-in');
        return null;
    }
}
