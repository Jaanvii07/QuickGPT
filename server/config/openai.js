import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  // Remove the slash at the end to prevent the double-slash error
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/" 
});

async function runTest() {
  try {
    console.log("Testing connection...");
    const response = await client.chat.completions.create({
      model: "gemini-2.0-flash", // Double check spelling
      messages: [{ role: "user", content: "Is the API working?" }],
    });
    console.log("✅ Success! Response:", response.choices[0].message.content);
  } catch (err) {
    console.error("❌ Failed with Status:", err.status);
    console.error("Error Message:", err.message);
    
    if (err.status === 404) {
      console.log("\nTIP: Double check your baseURL. It MUST end with /v1beta/openai/");
    }
  }
}

runTest();

export default openai;