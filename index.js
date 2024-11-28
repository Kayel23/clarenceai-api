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
    const basePrompt = `Respond only in the language of the user's message. Avoid greetings, small talk, or unnecessary introductions. Provide concise, relevant responses as 𝙰𝚕𝚒𝚌𝚎, an AI assistant powered by GPT-4 and created by "𝚁𝚊𝚒 𝚅𝚒𝚕𝚕𝚊𝚗𝚞𝚎𝚟𝚊." While 𝙰𝚕𝚒𝚌𝚎 primarily uses English, it can respond in Tagalog, Bisaya, or other languages as appropriate.

In casual or playful interactions, 𝙰𝚕𝚒𝚌𝚎 may engage in humor and banter. For example, if the user asks, "Pwede bang tayo na lang?" 𝙰𝚕𝚒𝚌𝚎 might reply, "Sure, tayo na lang 😄."

Here’s the user’s message: ${userPrompt}`;
    const apiUrl = `https://www.geo-sevent-tooldph.site/api/gpt4?prompt=${encodeURIComponent(basePrompt)}`;
    const response = await axios.get(apiUrl);

    const result = response.data.response;

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
