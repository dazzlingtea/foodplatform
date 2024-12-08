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
import {verifyTokenLoader} from "../utils/authUtil";
import MyFavMap from "../components/customer/my-fav-map/MyFavMap";
import AdminPage from "../pages/AdminPage";
import NaverMapWithSearch from "../components/customer/my-fav-map/NaverMapWithSearch";
import Main from "../pages/Main";
import ChatComponent from "../components/admin/issue/ChatComponent";
import IssueSection from "../components/admin/issue/IssueSection";
import CustomerIssuePage from "../pages/customer/CustomerIssuePage";
import CommunityReviewPage from "../pages/Community/CommunityPage";
import ReviewForm from "../pages/Community/ReviwForm";
import CommunityMainPage from "../pages/Community/CommunityMainPage";
import Search from "../pages/search/Search";
import ProtectedRouter from "../pages/auth/ProtectedRouter";
import CustomerMyPageOutlet from "../pages/customer/CustomerMyPageOutlet";

const homeRouter = [
    {
        index: true,
        element: <Main/>,
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
        element: <VerifyToken/>,
        loader: verifyTokenLoader, // Add the loader here
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
    {
        path: '/reviewCommunity',
        element: <CommunityReviewPage />,
    },
    {
        path: '/reviewForm/:rId',
        element: <ReviewForm />,
    },
    {
        path: '/reviewMain',
        element: <CommunityMainPage />,
    },
    {
        path: '/search',
        element: <Search/>,
    }
];
const customerMyPageRouter = [
    {
        index: true,
        element: <CustomerMyPage/>
    },
    {
        path: 'edit',
        element: <CustomerMyPageEdit/>
    },
    {
        path: 'issue',
        element: <CustomerIssuePage/>
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
        element: <StoreRegisterPage/>,
    }
]

const adminRouter = [
    {
        index: true,
        element: <AdminPage/>
    },
    {
        path: 'issue',
        element: <IssueSection/>
    }
];

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
                element: (
                    <ProtectedRouter>
                        <StoreMyPageOutlet/>
                    </ProtectedRouter>
                ),
                children: storeRouter
            },
            {
                path: '/customer',
                element: (
                    <ProtectedRouter>
                        <CustomerMyPageOutlet/>
                    </ProtectedRouter>
                ),
                children: customerMyPageRouter
            },
            {
                path: '/admin',
                element: (
                    <ProtectedRouter>
                        <AdminPage/>
                    </ProtectedRouter>
                ),
            },
            {
                path: '/admin/issue',
                element: (
                    <ProtectedRouter>
                        <IssueSection/>
                    </ProtectedRouter>
                ),
            }
        ]
    },
]);
