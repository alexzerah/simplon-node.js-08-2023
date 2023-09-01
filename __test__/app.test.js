const request = require('supertest');
const app = require('../app');

describe('GET /signin', () => {
  it('should return a greeting', async () => {
    const res = await request(app)
      .get('/api/signin')
      .expect('Content-Type', /json/)
      .expect(401);
  });
});
