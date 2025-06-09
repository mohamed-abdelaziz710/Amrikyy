// Simple placeholder Gemini service used during local development
// In a real deployment, this would call the Gemini 1.5 API.
async function generateResponse(messages) {
  const userMessage = messages.find(m => m.role === 'user');
  const text = userMessage ? userMessage.content : 'Hello';
  return {
    candidates: [
      { content: { parts: [ { text: `Echo: ${text}` } ] } }
    ]
  };
}

module.exports = { generateResponse };
