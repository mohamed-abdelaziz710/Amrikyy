// Gemini 1.5 API integration service
// You must set your Gemini API key in the environment or directly in this file for testing.

const fetch = require('node-fetch');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=' + GEMINI_API_KEY;

async function generateResponse(messages) {
    // messages: [{role: 'system'|'user', content: string}, ...]
    const parts = messages.map(m => ({text: m.content}));
    const requestBody = {
        contents: [
            {
                role: 'user',
                parts: parts
            }
        ]
    };
    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        if (!response.ok) {
            throw new Error('Gemini API error: ' + response.status + ' ' + await response.text());
        }
        return await response.json();
    } catch (err) {
        console.error('Gemini API call failed:', err);
        return null;
    }
}

module.exports = { generateResponse };
