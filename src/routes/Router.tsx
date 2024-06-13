import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import MainPage from '../pages/MainPage';
import SignUpPage from '../pages/SignUpPage';

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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
