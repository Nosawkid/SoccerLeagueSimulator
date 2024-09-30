import { Outlet } from "react-router-dom";
import NavBarComponent from "../components/NavBarComponent";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <NavBarComponent />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
