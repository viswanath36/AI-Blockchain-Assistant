import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./sidebar.css";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { icon: "🏠", name: "Dashboard", path: "/" },
    { icon: "📄", name: "Upload", path: "/upload" },
    { icon: "📚", name: "Documents", path: "/documents" },
    { icon: "⛓", name: "Blockchain", path: "/blockchain" },
    { icon: "✅", name: "Verify", path: "/verify" },
  ];

  return (
    <aside className="sidebar">

      <div className="logo-section">
        <img
          src={logo}
          alt="AI Blockchain Logo"
          className="logo"
        />

        <div className="logo-text">
          <h2>AI Blockchain</h2>
          <p>Assistant</p>
        </div>
      </div>

      <nav className="menu">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`menu-item ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <span className="menu-icon">
              {item.icon}
            </span>

            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <small>Version 1.0</small>
      </div>

    </aside>
  );
}

export default Sidebar;