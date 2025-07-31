import { Outlet } from 'react-router-dom';
import Navbar from '../components/CustomNavBar';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
