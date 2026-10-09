import express, { Express, request } from 'express';
import { HttpStatus } from './core/types/http-status.ts';
import { db } from './db/db.db';
import { Videos } from './videos/types/video.ts';

export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON в теле запроса

  // основной роут
  app.get('/', (_req, res) => {
    if (db.videos.length !== 0) {
      res.status(200).send('Hello world!');
    } else {
      res.status(404).send('Bye world!');
    }
  });

  //Список всех видео
  app.get('/videos', (req, res) => {
    res.status(HttpStatus.Ok_200).send(db.videos);
  });

  // Одно видео по id
  app.get('/videos/:id', (req, res) => {
    const foundVideo = db.videos.find((v) => v.id === Number(req.params.id));

    if (!foundVideo) {
      res.sendStatus(HttpStatus.NotFound_404);
      return;
    }
    res.status(HttpStatus.Ok_200).send(foundVideo);
  });

  //Создаем новое видео
  app.post('/videos', (req, res) => {


    const lastVideo = db.videos[db.videos.length - 1];
    const newVideo: Videos = {
      id: lastVideo ? lastVideo.id + 1 : 1,
      title: req.body.title,
      author: req.body.author ?? 'admin',
      canBeDownloaded: req.body.canBeDownloaded ?? false,
      minAgeRestriction: req.body.minAgeRestriction ?? null,
      createdAt: new Date().toISOString(),
      publicationDate: new Date().toISOString(),
      availableResolutions: req.body.availableResolutions ?? ['P144'],
    };

    //3. Добавляем созданное видео newVideo в БД
    db.videos.push(newVideo);
    res.status(HttpStatus.Created_201).send(newVideo);
  });

  app.delete('/videos:id', (req, res) => {
    db.videos = db.videos.filter((v) => v.id !== +req.params.id);
    res.sendStatus(HttpStatus.NoContent_204);
  });

  //возврат по title
  app.get('/videos', (req, res) => {
    let foundVideosQuery = db.videos;
    if (req.query.title) {
      foundVideosQuery = foundVideosQuery.filter(
        (v) => v.title.indexOf(req.query.title as string) > -1,
      );
    }

    res.json(foundVideosQuery);
  });

  return app;
};
