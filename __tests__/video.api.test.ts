import request = require('supertest');
const { app } = require('../src/');

describe('/videos', () => {
  beforeAll(async () => {
    await request(app).delete('/__tests__/data');
  });

  it('should return 200 and empty array', async () => {
    await request(app)
      .get('/videos')
      .expect(200, []);
  });

  it('should return 404 and empty array', async () => {
    await request(app)
      .get('/videos/1')
      .expect(404);
  });
});
