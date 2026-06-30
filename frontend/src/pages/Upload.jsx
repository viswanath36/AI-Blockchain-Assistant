import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../layouts/Layout";
import API from "../services/api";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.warning("Please select a PDF document.");
      return;
    }

    const formData = new FormData();
    formData.append("document", selectedFile);

    try {
      setLoading(true);

      const response = await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        response.data.message || "Document uploaded successfully!"
      );

      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        toast.error(error.response.data.error || "Upload failed.");
      } else {
        toast.error("Server not responding.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1>📄 Upload Document</h1>

      <br />

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
      />

      <br />
      <br />

      {selectedFile && (
        <div
          style={{
            padding: "20px",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            maxWidth: "500px",
          }}
        >
          <h3>Selected File</h3>

          <p>
            <strong>Name:</strong> {selectedFile.name}
          </p>

          <p>
            <strong>Size:</strong>{" "}
            {(selectedFile.size / 1024).toFixed(2)} KB
          </p>

          <p>
            <strong>Type:</strong> {selectedFile.type}
          </p>

          <br />

          <button
            onClick={handleUpload}
            disabled={loading}
            style={{
              padding: "10px 20px",
              background: loading ? "#94a3b8" : "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              transition: "0.3s",
            }}
          >
            {loading ? "⏳ Uploading..." : "📤 Upload PDF"}
          </button>
        </div>
      )}
    </Layout>
  );
}

export default Upload;