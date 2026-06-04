import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

function Login() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const handleAdminLogin = () => {
    login("admin");
    navigate("/products");
  };

  const handleUserLogin = () => {
    login("user");
    navigate("/products");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "300px",
        }}
      >
        <h2>Alpha Dashboard</h2>

        <button onClick={handleAdminLogin}>
          Login as Admin
        </button>

        <button onClick={handleUserLogin}>
          Login as User
        </button>
      </div>
    </div>
  );
}

export default Login;