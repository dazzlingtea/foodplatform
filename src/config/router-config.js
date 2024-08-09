import {createBrowserRouter} from "react-router-dom";
import CategoriesPage from "../pages/userMain/CategoriesPage";

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
import StoreRegisterPage from "../pages/store/StoreRegisterPage";
import {storeRegisterAction} from "../components/storeRegister/StoreRegisterForm";
import ProductRegisterForm from "../components/storeRegister/ProductRegisterForm";
import VerifyToken from "../components/auth/VerifyToken";
import MyFavMap from "../components/customer/my-fav-map/MyFavMap";
import AdminPage from "../pages/AdminPage";
import NaverMapWithSearch from "../components/customer/my-fav-map/NaverMapWithSearch";

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
        path: '/sign-in',
        element: <LoginPage/>
    },
    {
        path: 'email-verification',
        element: <EmailVerificationPage/>
    },
    {
        path: '/verifyEmail',
        element: <VerifyToken/>
    },
    {
        path: '/main',
        element: <MainPage/>
    },
    {
        path: '/myFavMap',
        element: <NaverMapWithSearch/>,
    },
    {
        path: '/:categoryName',
        element: <CategoriesPage/>,
    },
];
const customerMyPageRouter = [
    {
        index: true,
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
        element: <StoreMyPage/>,
    },
    {
        path: 'edit',
        element: <StoreMyPageEdit/>
    },
    {
        path: 'approval',
        element: <StoreRegisterPage/>,
        action: storeRegisterAction
    },
    {
        path: 'approval/p',
        element: <ProductRegisterForm/>,
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
            {
                path: '/admin',
                element: <AdminPage/>,
            }
        ]
    },
]);
