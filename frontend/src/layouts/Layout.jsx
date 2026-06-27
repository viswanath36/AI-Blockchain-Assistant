import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div
          style={{
            padding: "30px",
            background: "#f8fafc",
            minHeight: "calc(100vh - 70px)"
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;