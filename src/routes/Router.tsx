import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import MainPage from '../pages/MainPage';
import SignUpPage from '../pages/SignUpPage';
import RegisterPage from '../pages/RegisterPage';
import HospitalPage from '../pages/HospitalPage';
import LoginPage from '../pages/LoginPage';
import SuperPage from '../pages/SuperPage';
import MasterPage from '../pages/MasterPage';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/signUp',
          element: <SignUpPage />,
        },
        {
          path: '/register',
          element: <RegisterPage />,
        },
        {
          path: '/hospital',
          element: <HospitalPage />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/super',
          element: <SuperPage />,
        },
        {
          path: '/master',
          element: <MasterPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
