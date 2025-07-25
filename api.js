export async function sendMessageToAgent(userMessage) {
  const API_URL = "https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream";

  const payload = {
    messages: [
      {
        role: "user",
        content: userMessage
      }
    ],
    runId: "weatherAgent", // your roll number
    maxRetries: 2,
    maxSteps: 5,
    temperature: 0.5,
    topP: 1,
    runtimeContext: {},
    threadId:" 2022016402188555", // any string
    resourceId: "weatherAgent"
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Accept": "*/*",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        "Connection": "keep-alive",
        "Content-Type": "application/json",
        "x-mastra-dev-playground": "true"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok || !response.body) {
      throw new Error("❌ Failed to connect to API");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let result = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      // Optional debug
      // console.log("Received chunk:", chunk);

      const lines = chunk.split("\n").filter(line => line.trim().startsWith("{"));

      for (const line of lines) {
        try {
          const json = JSON.parse(line.trim());

          // Pick content from key "0" in streamed JSON
          if (typeof json["0"] === "string") {
            result += json["0"];
          }
        } catch (err) {
          console.warn("⚠️ JSON parse error in chunk:", err);
        }
      }
    }

    return result.trim() || "⚠️ Could not parse weather response.";

  } catch (error) {
    console.error("🌩️ API Error:", error);
    return "❌ Error getting weather data.";
  }
}
