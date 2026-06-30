import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../layouts/Layout";
import API from "../services/api";

function Documents() {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Fetch Documents
  const fetchDocuments = async () => {
    try {
      const response = await API.get("/documents");

      if (response.data.success) {
        setDocuments(response.data.documents);
        setFilteredDocuments(response.data.documents);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load documents.");
    } finally {
      setLoading(false);
    }
  };

  // Search
  const handleSearch = (value) => {
    setSearch(value);

    const filtered = documents.filter((doc) =>
      doc.filename.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredDocuments(filtered);
  };

  // View PDF
  const handleView = (id) => {
    window.open(
      `https://ai-blockchain-assistant.onrender.com/api/document/view/${id}`,
      "_blank"
    );
  };

  // Download PDF
  const handleDownload = (id) => {
    window.open(
      `https://ai-blockchain-assistant.onrender.com/api/document/download/${id}`,
      "_blank"
    );
  };

  // AI Chat
  const handleChat = (id) => {
    navigate(`/chat/${id}`);
  };

  // Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmDelete) return;

    try {
      const response = await API.delete(`/document/${id}`);

      if (response.data.success) {
        toast.success("Document deleted successfully.");
        fetchDocuments();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete document.");
    }
  };

  return (
    <Layout>
      <h1>📚 My Documents</h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "20px",
        }}
      >
        View, search and manage your uploaded documents.
      </p>

      <input
        type="text"
        placeholder="🔍 Search documents..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "450px",
          padding: "14px",
          borderRadius: "10px",
          border: "1px solid #cbd5e1",
          marginBottom: "30px",
          fontSize: "16px",
          outline: "none",
        }}
      />      {loading ? (
        <h3>Loading documents...</h3>
      ) : filteredDocuments.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,.08)",
          }}
        >
          <h1>📂</h1>

          <h2>No Documents Found</h2>

          <p style={{ color: "#64748b" }}>
            Try another search or upload a new document.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          {filteredDocuments.map((doc) => (
            <div
              key={doc._id}
              style={{
                background: "#ffffff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              }}
            >
              <h2>📄 {doc.filename}</h2>

              <p>
                <strong>Uploaded:</strong>{" "}
                {new Date(doc.uploadedAt).toLocaleString()}
              </p>

              <p>
                <strong>Blockchain Hash</strong>
              </p>

              <div
                style={{
                  background: "#f1f5f9",
                  padding: "10px",
                  borderRadius: "8px",
                  wordBreak: "break-word",
                  fontSize: "13px",
                  color: "#334155",
                  marginBottom: "20px",
                }}
              >
                {doc.fileHash || "Hash not available"}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => handleView(doc._id)}
                  style={{
                    padding: "10px 18px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    background: "#2563eb",
                    color: "#fff",
                    fontWeight: "600",
                  }}
                >
                  📄 View
                </button>

                <button
                  onClick={() => handleDownload(doc._id)}
                  style={{
                    padding: "10px 18px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    background: "#0ea5e9",
                    color: "#fff",
                    fontWeight: "600",
                  }}
                >
                  ⬇ Download
                </button>

                <button
                  onClick={() => handleChat(doc._id)}
                  style={{
                    padding: "10px 18px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    background: "#7c3aed",
                    color: "#fff",
                    fontWeight: "600",
                  }}
                >
                  🤖 AI Chat
                </button>

                <button
                  onClick={() => handleDelete(doc._id)}
                  style={{
                    padding: "10px 18px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    background: "#dc2626",
                    color: "#fff",
                    fontWeight: "600",
                  }}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}    </Layout>
  );
}

export default Documents;