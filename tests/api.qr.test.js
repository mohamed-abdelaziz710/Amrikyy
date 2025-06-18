const request = require('supertest');
const app = require('../server');

describe('GET /api/qr', () => {
  it('returns 400 when data parameter is missing', async () => {
    const res = await request(app).get('/api/qr');
    expect(res.statusCode).toBe(400);
  });

  it('returns a data URL when data parameter is provided', async () => {
    const res = await request(app).get('/api/qr').query({ data: 'hello' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('dataUrl');
  });
});
