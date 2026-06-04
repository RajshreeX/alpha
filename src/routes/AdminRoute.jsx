import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function AdminRoute({ children }) {
  const role = useAuthStore((state) => state.role);

  if (role !== "admin") {
    return <Navigate to="/products" />;
  }

  return children;
}

export default AdminRoute;