import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ModalProvider from "../pages/common/ModalProvider";
import Header from "./Header";
import Footer from "./Footer";

const RootLayout = () => {
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 400); // 초기 화면 너비 상태 설정

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 400);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // footer 숨길 경로
    const hideFooterRoutes = ['/store', '/customer'];

    // 현재 경로가 hideFooterRoutes 중 하나로 시작 && 화면이 모바일 상태이면 true
    const shouldHideFooter = hideFooterRoutes.some(route => location.pathname.startsWith(route)) && isMobile;

    return (
        <ModalProvider>
           <Header />
            <main>
                <Outlet />
            </main>
            {!shouldHideFooter && ( // shouldHideFooter가 true가 아닌 경우에만 footer 렌더링
                < Footer />) }
        </ModalProvider>
    );
};

export default RootLayout;