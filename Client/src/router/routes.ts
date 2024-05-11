import { TRoutes } from "../types/TRoutes";

// Import the page components to link them to the routes
import {
  Landing,
  About,
  GetInfo,
  GetUserTokens,
  PushTransaction,
  Contact
} from "../Pages/";

// Export the routes. See TRoutes for more details
export const DinamicRoutes = [
  {
    path: "/",
    title: "route.home",  // This is the key from the i18n file
    component: Landing,
    exact: true,
    isPrivate: false,
    showInMenu: false
  },
  {
    path: "/getinfo",
    title: "route.testing",
    component: GetInfo,
    exact: true,
    isPrivate: false,
    showInMenu: true
  },
  {
    path: "/user-tokens",
    title: "route.userTokens",
    component: GetUserTokens,
    exact: true,
    isPrivate: true,
    showInMenu: false
  },
  {
    path: "/transaction",
    title: "route.transaction",
    component: PushTransaction,
    exact: true,
    isPrivate: true,
    showInMenu: true
  },
  {
    path: "/about",
    title: "route.about",
    component: About,   
    exact: true,
    isPrivate: false,
    showInMenu: false
  },
  {
    path: "/contact",
    title: "route.contact",
    component: Contact,   
    exact: true,
    isPrivate: false,
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
