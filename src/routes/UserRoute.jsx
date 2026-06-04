import { Navigate  } from "react-router-dom";
import useAuthStore from "../store/authStore";

function UserRoute({ children }) {
  const role = useAuthStore((state) => state.role);

  if (!role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default UserRoute;