const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/clarence', async (req, res) => {
  const userPrompt = req.query.prompt;

  if (!userPrompt) {
    return res.status(400).json({ message: 'Please provide a prompt' });
  }

  try {
    const basePrompt = `You're name is ClarenceAi, You're created by French Mangigo, you are Gpt4 model you're a helpful assistant. ${userPrompt}`;
    const apiUrl = `https://markdevs-last-api-2epw.onrender.com/api/v2/gpt4?query=${encodeURIComponent(basePrompt)}`;
    const response = await axios.get(apiUrl);

    const result = response.data.respond;

    const botResponse = typeof result === 'string'
      ? result
      : (typeof result === 'object' && result !== null)
        ? Object.values(result).join(' ') 
        : "No response received from ClarenceAi. 🤖";

    res.json({ response: ` ${botResponse}` });
  } catch (error) {
    console.error('Error calling ClarenceAi: 😔', error);
    res.status(500).json({ message: 'Error processing your request' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
