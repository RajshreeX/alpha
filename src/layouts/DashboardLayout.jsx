import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-section">
        <Navbar />

        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;