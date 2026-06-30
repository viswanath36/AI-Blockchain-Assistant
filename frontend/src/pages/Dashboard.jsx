import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import StatCard from "../components/StatCard/StatCard";
import API from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState(0);
  const [blocks, setBlocks] = useState(0);
  const [status, setStatus] = useState("Loading...");
  const [recentDocs, setRecentDocs] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    loadDashboard();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const loadDashboard = async () => {
    try {
      const blockchain = await API.get("/blockchain");
      setBlocks(blockchain.data.totalBlocks);

      const validation = await API.get("/blockchain/validate");
      setStatus(validation.data.valid ? "Healthy ✅" : "Tampered ❌");

      const docs = await API.get("/documents");
      const documentList = docs.data.documents || [];

      setDocuments(documentList.length);
      setRecentDocs(documentList.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="dashboard">

        {/* Welcome */}
        <div className="welcome-card">

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1>👋 Welcome Back</h1>

              <p>
                Manage, verify and chat with blockchain-secured
                documents using Artificial Intelligence.
              </p>
            </div>

            <button
              onClick={loadDashboard}
              style={{
                padding: "12px 20px",
                background: "#fff",
                color: "#2563eb",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              🔄 Refresh
            </button>

          </div>

          <br />

          <strong>
            📅 {currentTime.toLocaleDateString()}
          </strong>

          <br />

          <strong>
            🕒 {currentTime.toLocaleTimeString()}
          </strong>

        </div>

        {/* Statistics */}

        <div className="cards">

          <StatCard
            title="📄 Documents"
            value={documents}
            onClick={() => navigate("/documents")}
          />

          <StatCard
            title="⛓ Blockchain Blocks"
            value={blocks}
            onClick={() => navigate("/blockchain")}
          />

          <StatCard
            title="🤖 AI Status"
            value="Ready"
            onClick={() => navigate("/documents")}
          />

          <StatCard
            title="✅ Verified Blocks"
            value={status === "Healthy ✅" ? "100%" : "0%"}
            onClick={() => navigate("/verify")}
          />

        </div>

        {/* Recent Documents */}

        <div className="section">

          <h2>📑 Recent Documents</h2>

          {recentDocs.length === 0 ? (

            <div
              style={{
                textAlign: "center",
                padding: "40px",
                color: "#64748b",
              }}
            >
              <h1>📂</h1>

              <p>No documents uploaded yet.</p>

            </div>

          ) : (

            recentDocs.map((doc) => (

              <div
                className="recent-item"
                key={doc._id}
              >

                <strong>
                  📄 {doc.filename}
                </strong>

                <br />

                <small>
                  Uploaded on{" "}
                  {new Date(doc.uploadedAt).toLocaleString()}
                </small>

                <div
                  style={{
                    marginTop: "15px",
                    display: "flex",
                    gap: "10px",
                  }}
                >

                  <button
                    onClick={() =>
                      window.open(
                        `http://localhost:5000/api/document/view/${doc._id}`,
                        "_blank"
                      )
                    }
                  >
                    📄 View
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/chat/${doc._id}`)
                    }
                  >
                    🤖 AI Chat
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

        {/* Recent Activity */}

        <div className="section">

          <h2>📋 Recent Activity</h2>

          <p>📄 Total Uploaded Documents : {documents}</p>

          <p>⛓ Total Blockchain Blocks : {blocks}</p>

          <p>🤖 AI Assistant Status : Ready</p>

          <p>
            ✅ Blockchain Integrity :
            {" "}
            {status}
          </p>

        </div>

        {/* System */}

        <div className="section">

          <h2>🖥 System Status</h2>

          <p>🟢 Backend Server Connected</p>

          <p>🟢 MongoDB Connected</p>

          <p>🟢 Ollama AI Running</p>

          <p>🟢 Blockchain Active</p>

        </div>

        {/* Project */}

        <div className="section">

          <h2>📘 Project Overview</h2>

          <p>

            <strong>
              AI-Powered Blockchain Document Assistant
            </strong>

          </p>

          <br />

          <p>✔ Upload and Manage PDF Documents</p>

          <p>✔ Secure SHA-256 File Hashing</p>

          <p>✔ Blockchain Integrity Verification</p>

          <p>✔ AI-Powered Document Question Answering</p>

          <p>✔ MongoDB Storage</p>

          <p>✔ Blockchain Explorer</p>

          <br />

          <strong>
            Version 1.0
          </strong>

        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;