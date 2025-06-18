const request = require('supertest');
const app = require('../server');
const gemini = require('../geminiService');

jest.mock('../geminiService');

describe('POST /api/chat', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 when no prompt is provided', async () => {
    const res = await request(app).post('/api/chat').send({});
    expect(res.statusCode).toBe(400);
  });

  it('returns bot response when service resolves', async () => {
    gemini.generateResponse.mockResolvedValue({
      candidates: [{ content: { parts: [{ text: 'hi' }] } }]
    });
    const res = await request(app).post('/api/chat').send({ prompt: 'hi' });
    expect(res.statusCode).toBe(200);
    expect(res.body.response).toBe('hi');
  });

  it('rejects prompts over 1KB', async () => {
    const longPrompt = 'a'.repeat(1025);
    const res = await request(app).post('/api/chat').send({ prompt: longPrompt });
    expect(res.statusCode).toBe(413);
    expect(gemini.generateResponse).not.toHaveBeenCalled();
  });

  it('handles service errors gracefully', async () => {
    gemini.generateResponse.mockRejectedValue(new Error('fail'));
    const res = await request(app).post('/api/chat').send({ prompt: 'hi' });
    expect(res.statusCode).toBe(502);
  });
});
