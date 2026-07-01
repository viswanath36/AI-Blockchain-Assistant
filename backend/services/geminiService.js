const { GoogleGenAI } = require("@google/genai");

console.log("GEMINI KEY EXISTS:", !!process.env.GEMINI_API_KEY);

console.log(
  "GEMINI KEY PREFIX:",
  process.env.GEMINI_API_KEY
    ? process.env.GEMINI_API_KEY.substring(0, 10)
    : "NOT FOUND"
);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const askLLM = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);

    return "Error communicating with AI.";
  }
};

module.exports = askLLM;