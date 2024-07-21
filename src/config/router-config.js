import {createBrowserRouter, Outlet} from "react-router-dom";

import RootLayout from '../layout/RootLayout';
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import StoreMyPageEdit from "../pages/store/StoreMyPageEdit";
import StoreMyPageOutlet from "../pages/store/StoreMyPageOutlet";
import MainPage from "../pages/userMain/MainPage";
import SignUpPage from "../pages/auth/SignUpPage";
import LoginPage from "../pages/auth/LoginPage";
import EmailVerificationPage from "../pages/auth/EmailVerificationPage";
import StoreMyPage from "../pages/store/StoreMyPage";
import CustomerMyPage from "../pages/customer/CustomerMyPage";
import CustomerMyPageEdit from "../pages/customer/CustomerMyPageEdit";


const homeRouter = [
    {
        index: true,
        element: <div>hi</div>,
    },
    {
        path: '/sign-up',
        element: <SignUpPage/>
    },
    {
        path: '/login',
        element: <LoginPage/>
    },
    {
        path: 'email-verification',
        element: <EmailVerificationPage/>
    },
    {
        path: '/main',
        element: <MainPage />
    }
];

const customerMyPageRouter = [
    {
        path: 'mypage',
        element: <CustomerMyPage/>
    },
    {
        path: 'edit',
        element: <CustomerMyPageEdit/>
    }
];

const storeRouter = [
    {
        index: true,
        element: <StoreMyPage />,
    },
    {
        path: 'edit',
        element: <StoreMyPageEdit/>
    }
]

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: '/',
                element: <Home/>,
                children: homeRouter,
            },
            {
                path: '/store',
                element: <StoreMyPageOutlet/>,
                children: storeRouter
            },
            {
                path: '/customer',
                children: customerMyPageRouter
            },
        ]
    },
]);