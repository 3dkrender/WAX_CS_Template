import { Outlet } from "react-router-dom";
import { Menu } from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";

/**
 * @returns Render the landing page
 */
export const Landing = () => {
 
  return (
    <>
      <Menu />
      <div className="min-h-[500px]" >
        <Outlet />
      </div>
      <Footer />
    </>
  )
};
