import "./navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      {/* Left Side */}
      <div>
        <h1 className="navbar-title">
          AI Blockchain Assistant
        </h1>

        <p className="navbar-subtitle">
          Secure • Transparent • Intelligent
        </p>
      </div>

      {/* Right Side */}
      <div className="profile-card">
        <div className="profile-avatar">
          👤
        </div>

        <div className="profile-info">
          <h3>User</h3>
        </div>
      </div>
    </div>
  );
}

export default Navbar;