require("dotenv").config();
const axios = require("axios");

async function makeOpenAIRequest(prompt) {
  const apiUrl = "https://api.openai.com/v1/chat/completions"; // Correct API endpoint
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API}`,
  };
  const body = {
    model: "gpt-3.5-turbo", // You can use 'gpt-3.5-turbo' or other suitable models
    messages: [
      {
        role: "system",
        content:
          "You are a senior backend developer assisting with OpenAI chat completions.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  const response = await axios.post(apiUrl, body, { headers });
  return response.data.choices[0].message.content;
}

module.exports = {
  makeOpenAIRequest,
};
