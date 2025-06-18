const request = require('supertest');
const app = require('../server');

describe('GET /api/tools', () => {
  it('responds with an array of tools', async () => {
    const res = await request(app).get('/api/tools');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

