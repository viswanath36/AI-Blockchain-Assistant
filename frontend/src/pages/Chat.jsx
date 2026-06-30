import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../layouts/Layout";
import API from "../services/api";

function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // No document selected
  if (!id) {
    return (
      <Layout>
        <div
          style={{
            maxWidth: "700px",
            margin: "80px auto",
            background: "#fff",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <h1>🤖 AI Document Assistant</h1>

          <br />

          <h2>No Document Selected</h2>

          <p
            style={{
              color: "#64748b",
              fontSize: "17px",
            }}
          >
            Please select a document first before starting an AI chat.
          </p>

          <br />

          <button
            onClick={() => navigate("/documents")}
            style={{
              padding: "12px 24px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            📚 Go to Documents
          </button>
        </div>
      </Layout>
    );
  }

  const handleAsk = async () => {
    if (!message.trim()) {
      toast.warning("Please enter a question.");
      return;
    }

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await API.post(`/chat/${id}`, {
        message: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: response.data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get AI response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1>🤖 AI Document Assistant</h1>

      <p>Ask questions about your selected document.</p>

      <br />

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          minHeight: "450px",
          maxHeight: "500px",
          overflowY: "auto",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        {messages.length === 0 ? (
          <p style={{ color: "#64748b" }}>
            Start by asking a question about your document.
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  msg.sender === "user"
                    ? "flex-end"
                    : "flex-start",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  maxWidth: "70%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background:
                    msg.sender === "user"
                      ? "#2563eb"
                      : "#f1f5f9",
                  color:
                    msg.sender === "user"
                      ? "#fff"
                      : "#111827",
                }}
              >
                <strong>
                  {msg.sender === "user"
                    ? "You"
                    : "AI"}
                </strong>

                <br />
                <br />

                {msg.text}
              </div>
            </div>
          ))
        )}

        {loading && (
          <p style={{ color: "#2563eb" }}>
            🤖 AI is thinking...
          </p>
        )}
      </div>

      <br />

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Ask a question..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAsk();
            }
          }}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            fontSize: "16px",
          }}
        />

        <button
          onClick={handleAsk}
          disabled={loading}
          style={{
            padding: "12px 24px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </Layout>
  );
}

export default Chat;