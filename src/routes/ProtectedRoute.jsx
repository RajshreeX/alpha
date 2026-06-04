import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function ProtectedRoute({
  children,
  requiredRole,
}) {
  const role = useAuthStore(
    (state) => state.role
  );

  if (!role) {
    return <Navigate to="/" replace />;
  }

  if (
    requiredRole &&
    role !== requiredRole
  ) {
    return (
      <Navigate
        to="/products"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;