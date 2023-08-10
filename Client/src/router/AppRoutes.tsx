import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu } from "../components/Menu/Menu";
import { DinamicRoutes } from "./routes";
import Footer from "../components/Footer/Footer";

import '../App.css'

/**
 * Render the routes
 * If user is logged in, render the private routes
 */
export const AppRoutes = () => {
  const userState = useSelector((state: any) => state.user);
  const { isLogged } = userState;

  return (
    <div>
      <BrowserRouter>
        <Menu />
        <div className="min-h-[560px]" >
          <Routes>
            {
              DinamicRoutes.map((route, index) => {
                if (route.isPrivate && !isLogged) return null;
                return <Route path={route.path} element={<route.component />} key={`${index}-${route.path}`} />
              })
            }
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
};