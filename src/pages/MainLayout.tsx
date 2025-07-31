import { Outlet } from 'react-router-dom';
import Navbar from '../components/NavBar/CustomNavBar';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
