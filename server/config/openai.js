import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  // Remove the slash at the end to prevent the double-slash error
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai" 
});

export default openai;