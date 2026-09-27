import express, { Express } from 'express';
import { HttpStatus } from './core/types/http-status';
import { db } from './db/db';
import { Videos } from './core/types/type';

export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON в теле запроса

  // основной роут
  app.get('/', (_req, res) => {
    res.status(200).send('Hello world!');
  });

  //Возвращаем все видео
  app.get('/videos', (_req, res) => {
    res.status(HttpStatus.Ok).send(db.videos);
  });

  // Создаем новое видео
  app.post('/videos', (req, res) => {
    const lastVideo = db.videos[db.videos.length - 1];
    const newVideo: Videos = {
      id: lastVideo ? lastVideo.id + 1 : 1,
      title: req.body.title,
      author: req.body.author as string,
      canBeDownloaded: req.body.canBeDownloaded,
      minAgeRestriction: req.body.minAgeRestriction,
      createdAt: new Date().toISOString(),
      publicationDate: new Date().toISOString(),
      availableResolutions: req.body.availableResolutions,
    };

    //3. Добавляем созданное видео newVideo в БД
    db.videos.push(newVideo);
    res.status(HttpStatus.Created).send(newVideo);
  });
  return app;
};
