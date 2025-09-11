import { GoogleGenerativeAI } from "@google/generative-ai";

// Support multiple API keys via comma-separated env or fallback to single key
const rawKeys = (process.env.NEXT_PUBLIC_GEMINI_API_KEYS || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "")
  .split(",")
  .map((k) => k.trim())
  .filter(Boolean);

let lastWorkingIndex = 0;

function createChatForKey(key) {
  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  return model.startChat({
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
    },
    safetySettings: [],
  });
}

function isRetriableStatus(err) {
  const code = Number(err?.status || err?.code || 0);
  return [429, 500, 502, 503, 504].includes(code);
}

// Export an object that mimics the old API: chatSession.sendMessage(prompt)
export const chatSession = {
  async sendMessage(prompt) {
    if (!rawKeys.length) {
      throw new Error("Gemini API key(s) not configured");
    }

    const errors = [];
    for (let i = 0; i < rawKeys.length; i++) {
      const idx = (lastWorkingIndex + i) % rawKeys.length;
      const key = rawKeys[idx];
      try {
        const chat = createChatForKey(key);
        const res = await chat.sendMessage(prompt);
        lastWorkingIndex = idx; // remember successful key
        return res;
      } catch (err) {
        errors.push(err);
        if (!isRetriableStatus(err)) {
          // For non-retriable errors, try next key anyway
          continue;
        }
      }
    }
    throw errors[errors.length - 1] || new Error("All Gemini API keys failed");
  },
};
