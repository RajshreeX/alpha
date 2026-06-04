import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

function Sidebar() {
  const role = useAuthStore((state) => state.role);
  const name = useAuthStore((state) => state.name);

  return (
    <aside className="sidebar">
      <div>
        <h2>Alpha</h2>

        <nav>
          <ul>
            <li>
              <Link to="/products">
                Products
              </Link>
            </li>

            {role === "admin" && (
              <li>
                <Link to="/analytics">
                  Analytics
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div className="sidebar-profile">
        <div className="avatar">
          {name?.charAt(0)}
        </div>

        <div>
          <p>{name}</p>
          <small>{role}</small>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;