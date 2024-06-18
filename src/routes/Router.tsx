import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import MainPage from '../pages/MainPage';
import RegisterPage from '../pages/RegisterPage';
import HospitalPage from '../pages/HospitalPage';
import LoginPage from '../pages/LoginPage';

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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;

