import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { DinamicRoutes } from "./router/routes";
import { createBrowserRouter } from "react-router-dom";
import { Landing } from "../src/Pages/";
import ErrorPage from "../src/Pages/ErrorPage";
import { MainPage } from "../src/Pages/Landing/main";

import { SessionKit } from '@wharfkit/session'
import { WalletPluginAnchor } from '@wharfkit/wallet-plugin-anchor'
import { WalletPluginCloudWallet } from '@wharfkit/wallet-plugin-cloudwallet'
import { WalletPluginWombat } from "@wharfkit/wallet-plugin-wombat";
import WebRenderer from '@wharfkit/web-renderer'

import "./App.css";

const chains = [
  {
    id: import.meta.env.VITE_CHAINID,
    url: import.meta.env.VITE_RPC,
  }
];

const walletPlugins = [];
walletPlugins.push(new WalletPluginAnchor());
if (import.meta.env.VITE_CHAIN === 'mainnet') {
  walletPlugins.push(new WalletPluginWombat());
  walletPlugins.push(new WalletPluginCloudWallet());
}

export const sessionKit = new SessionKit({
  appName: import.meta.env.VITE_SITE_TITLE,
  chains,
  ui: new WebRenderer(),
  walletPlugins,
})


const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      ...DinamicRoutes.map((route) => {
        return {
          path: route.path,
          element: <route.component />,
        }
      })
    ]
  },
]);


/**
 * Render the app and routes
 */
function App() {
  return (
    <div>
      <Suspense fallback={<>Loading...</>}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  )
}

export default App
