import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import MainPage from '../pages/MainPage';
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
          path: '/login',
          element: <LoginPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
