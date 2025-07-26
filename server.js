const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;
const GEMINI_API_KEY = "Your gemini api key";

app.use(cors());
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: userMessage }] }]
            }
        );

        let botReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";

        // Format response for better readability
        botReply = botReply
            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')  // Convert **bold** to <b>bold</b>
            .replace(/\n{2,}/g, '<br><br>')          // Preserve paragraph breaks
            .replace(/•/g, '🔹')                     // Convert bullet points to 🔹
            .replace(/\n/g, '<br>');                 // Convert newlines to <br> for HTML display

        res.json({ reply: botReply });

    } catch (error) {
        console.error('Error fetching response:', error);
        res.status(500).json({ error: "Failed to get response from Gemini API" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
