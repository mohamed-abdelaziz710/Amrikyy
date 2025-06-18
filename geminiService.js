// Gemini service used to generate responses via the Gemini 1.5 API
// Requires the following environment variables:
//   GEMINI_API_KEY      - your API key
//   GEMINI_API_ENDPOINT - full endpoint URL (e.g. https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent)

/**
 * Call the Gemini 1.5 API and return the raw JSON response
 * @param {Array<{role: string, content: string}>} messages Conversation messages
 */
async function generateResponse(messages) {
  const apiKey = process.env.GEMINI_API_KEY;
  const endpoint = process.env.GEMINI_API_ENDPOINT;

  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY environment variable');
  }
  if (!endpoint) {
    throw new Error('Missing GEMINI_API_ENDPOINT environment variable');
  }

  const url = `${endpoint}?key=${apiKey}`;

  const body = {
    contents: messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }))
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    let errText;
    try {
      const errPayload = await response.json();
      errText = errPayload.error?.message || response.statusText;
    } catch (_) {
      errText = response.statusText;
    }
    throw new Error(`Gemini API error: ${errText}`);
  }

  return response.json();
}

module.exports = { generateResponse };
