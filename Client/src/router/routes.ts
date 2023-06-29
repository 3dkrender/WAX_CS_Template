import { TRoutes } from "../types/TRoutes";

// Import the page components to link them to the routes
import {
  Landing,
  GetInfo,
  GetUserTokens
} from "../Pages/";

// Export the routes. See TRoutes for more details
export const DinamicRoutes = [
  {
    path: "/",
    title: "Landing Page",
    component: Landing,
    exact: true,
    isPrivate: false,
    showInMenu: false
  },
  {
    path: "/getinfo",
    title: "Testing Page",
    component: GetInfo,
    exact: true,
    isPrivate: false,
    showInMenu: true
  },
  {
    path: "/user-tokens",
    title: "User Tokens Page",
    component: GetUserTokens,
    exact: true,
    isPrivate: true,
    showInMenu: false
  },
  {
    path: "*",
    title: "404",
    component: Landing,
    exact: true,
    isPrivate: false,
    showInMenu: false
  }
] as TRoutes;
