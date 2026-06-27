import { useState } from "react";
import Layout from "../layouts/Layout";
import API from "../services/api";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.message);

      // Clear the selected file after successful upload
      setSelectedFile(null);

    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.error || "Upload failed.");
      } else {
        alert("Server not responding.");
      }
    }
  };

  return (
    <Layout>
      <h1>📄 Upload Document</h1>

      <br />

      <input
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
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
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
            style={{
              padding: "10px 20px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Upload PDF
          </button>
        </div>
      )}
    </Layout>
  );
}

export default Upload;