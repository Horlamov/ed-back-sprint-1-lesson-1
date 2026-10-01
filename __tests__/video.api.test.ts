import request = require('supertest');
import { HttpStatus } from '../src/core/types/http-status';
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

  it ('should create course with correct input data', async () => {
    const createResponse = await request(app)
      .post('/videos')
      .send({title: 'it-incubator video'})
      .expect(HttpStatus.Created_201)

    const createVideos = createResponse.body;
    expect(createVideos).toEqual({
      id: expect.any(Number),
      title: 'it-incubator video',
      author: expect.any(String),
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: expect.any(String),
      publicationDate: expect.any(String),
      availableResolutions: ['P144'],
    });
    await request(app)
      .get('/videos')
      .expect(HttpStatus.Ok_200, [createVideos])

  })
});
