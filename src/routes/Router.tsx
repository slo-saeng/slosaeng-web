import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import MainPage from '../pages/MainPage';
import SignUpPage from '../pages/SignUpPage';
import RegisterPage from '../pages/RegisterPage';
import HospitalPage from '../pages/HospitalPage';
import LoginPage from '../pages/LoginPage';
import DoctorPage from '../pages/DoctorPage';
import SuperPage from '../pages/SuperPage';
import MasterPage from '../pages/MasterPage';
import HelperPage from '../pages/HelperPage';
import ForbiddenPage from '../pages/ForbiddenPage';

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
          path: '/doctor',
          element: <DoctorPage />,
        },
        {
          path: '/super',
          element: <SuperPage />,
        },
        {
          path: '/master',
          element: <MasterPage />,
        },
        {
          path: '/helper',
          element: <HelperPage />,
        },
        {
          path: '/forbidden',
          element: <ForbiddenPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
