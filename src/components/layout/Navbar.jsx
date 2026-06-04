import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

function Navbar() {
  const navigate = useNavigate();

  const role = useAuthStore((state) => state.role);
  const name = useAuthStore((state) => state.name);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div>
        <h2>Dashboard</h2>
      </div>

      <div className="profile-section">
        <div className="profile-info">
          <div className="avatar">
            {name?.charAt(0)}
          </div>

          <div>
            <p>{name}</p>
            <small>{role}</small>
          </div>
        </div>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;