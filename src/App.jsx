import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";

const Login = lazy(() =>
  import("./pages/Login/Login")
);

const Products = lazy(() =>
  import("./pages/Products/Products")
);

const ProductDetail = lazy(() =>
  import(
    "./pages/ProductDetail/ProductDetail"
  )
);

const Analytics = lazy(() =>
  import("./pages/Analytics/Analytics")
);

function App() {
  return (
    <Suspense
      fallback={<h2>Loading...</h2>}
    >
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute
              requiredRole="admin"
            >
              <Analytics />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;