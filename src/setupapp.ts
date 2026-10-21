import express, { Express, response } from 'express';
import { videosRouter } from './videos/routers/videos.router.ts';
import { testingRouter } from './testing/routers/testing.routers.ts';
import { VIDEOS_PATH, VIDEOS_ROUTES } from './videos/constants/videos.paths.ts';
import { TESTING_PATH } from './testing/constants/testing.paths.ts';
import { HttpStatus } from './core/types/http-status';

export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON в теле запроса

  app.use(VIDEOS_PATH, videosRouter);
  app.use(TESTING_PATH, testingRouter);

  return app;

}
