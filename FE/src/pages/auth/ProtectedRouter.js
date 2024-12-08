import {Link, Navigate, redirect} from "react-router-dom";
import {getToken} from "../../utils/authUtil";

const ProtectedRouter = ({ children }) => {
    if (!getToken()) {
        alert("로그인이 필요합니다")
        return <Navigate to={"/sign-in"} replace/> ;
    }
    return children;
};

export default ProtectedRouter;