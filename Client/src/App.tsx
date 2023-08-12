import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { DinamicRoutes } from "./router/routes";
import { createBrowserRouter } from "react-router-dom";
import { Landing } from "../src/Pages/";
import ErrorPage from "../src/Pages/ErrorPage";
import { MainPage } from "../src/Pages/Landing/main";

import "./App.css";

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
