import { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from './redux/store';
import { AppRoutes } from "./router/AppRoutes";

/**
 * Render the app and routes
 */
function App() {
  return (
    <div>
      <Suspense fallback={<>Cargando</>}>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </Suspense>
    </div>
  )
}

export default App
