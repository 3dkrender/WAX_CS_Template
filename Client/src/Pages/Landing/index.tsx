import { Outlet } from "react-router-dom";
import { Menu } from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";

/**
 * @returns Render the landing page
 */
export const Landing = () => {
 
  return (
    <div className="flex flex-col min-h-screen">
      <Menu />
      <main className="flex-grow max-w-7xl m-auto" >
        <Outlet />
      </main>
      <Footer />
    </div>
  )
};
