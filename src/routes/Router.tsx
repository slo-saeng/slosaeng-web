import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import MainPage from '../pages/MainPage';

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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
