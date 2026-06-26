const axios = require("axios");

const askLLM = async (prompt) => {
  try {
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3",
        prompt: prompt,
        stream: false
      }
    );

    return response.data.response;
  } catch (error) {
    console.error("Ollama Error:", error.message);
    return "Error communicating with AI";
  }
};

module.exports = askLLM;