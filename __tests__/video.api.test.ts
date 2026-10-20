import request from 'supertest';
import express, { response } from 'express';
import { setupApp } from '../src/setup-app';
import { HttpStatus } from '../src/core/types/http-status';
import { VideoInputDto } from '../src/videos/dto/video.input.dto';
import { Resolution } from '../src/videos/types/video';

describe('/videos', () => {
  const app = express();
  setupApp(app);

  const testVideoData: VideoInputDto = {
    title: 'it-incubator video',
    author: 'admin',
    availableResolutions: [Resolution.P144],
  };

  beforeAll(async () => {
    await request(app).delete('/testing/all-data').expect(HttpStatus.NoContent_204);
  });

  it('should return 200 and empty array', async () => {
    await request(app).get('/videos').expect(200, []);
  });

  it('should return 404 and empty array', async () => {
    await request(app).get('/videos/9999').expect(404);
  });

  it('should create course with correct input data', async () => {
    const newVideo: VideoInputDto = {
      title: 'it-incubator video',
      author: 'admin',
      availableResolutions: [Resolution.P144],
    };
    const createResponse = await request(app)
      .post('/videos')
      .send(newVideo)
      .expect(HttpStatus.Created_201);


    expect(createResponse.body).toEqual({
      id: expect.any(Number),
      title: 'it-incubator video',
      author: 'admin',
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: expect.any(String),
      publicationDate: expect.any(String),
      availableResolutions: ['P144'],
    });

    await request(app).get('/videos').expect(HttpStatus.Ok_200, [createResponse.body]);
    await request(app).get(`/videos/${createResponse.body.id}`).expect(HttpStatus.Ok_200)


//Тест на возврат по Id
    const id = createResponse.body.id; // ← реальный id, точно есть в базе
    console.log('Testing id:', id); // ← посмотреть, какой id

    await request(app).get(`/videos/${id}`).expect(200);
  });
  let createdCourse: any = null;

  // it('Put', async () => {
  //   const createResponse = await request(app)
  //     .post('/videos' + createdCourse.id)
  //     .send({title: 'it-incubator course'})
  //     .expect(HttpStatus.NoContent_204);
  //
  //   createdCourse = response.body;
  // });



it('Delete', async () => {
    await request(app).get('/videos').expect(200);
  });
});
