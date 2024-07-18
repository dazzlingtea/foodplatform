import {createBrowserRouter} from "react-router-dom";
import RootLayout from '../layout/RootLayout';
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import StoreMyPage from "../pages/store/StoreMyPage";
import CustomerMyPage from "../pages/customer/CustomerMyPage";

const homeRouter = [
  {
    index: true,
    element: <div>hi</div>,
  },
  {
    path: '/sign-in',
    element: <div>sign-in page</div>
  }
];

const customerMyPageRouter = [
  {
    path: 'mypage',
    element: <CustomerMyPage />
  },
  {
    path: 'mypage-edit',
    element: <div>Customer MyPage Edit Page</div>
  }
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: '/',
        element: <Home />,
        children: homeRouter,
      },
      {
        path: '/store',
        element: <StoreMyPage />,
      },
      {
        path: '/customer/*',
        children: customerMyPageRouter,
      }
    ]
  },
]);