import { Outlet } from 'react-router-dom';
import Navbar from '../component/common/Navbar/Navbar';
import Footer from '../component/common/Footer/Footer';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
