import express, { Express, response } from 'express';
import { db } from './db/in-memory.db';
import { HttpStatus } from './core/types/http-status';
import { Video } from './videos/types/video';
import { Resolution } from './videos/types/video';

export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON в теле запроса

  app.delete('/testing/all-data', (_req, res) => {
    db.videos = [];
    res.sendStatus(HttpStatus.NoContent_204);
  });

  // основной роут
  app.get('/', (_req, res) => {
    if (db.videos.length !== 0) {
      res.status(200).send('Hello world!');
    } else {
      res.status(404).send('Bye world!');
    }
  });

  //Список всех видео
  app.get('/videos', (_req, res) => {
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
    const createdAt = new Date();
    const publicationDate = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);

    const newVideo: Video = {
      id: lastVideo ? lastVideo.id + 1 : 1,
      title: req.body.title,
      author: req.body.author ?? 'admin',
      canBeDownloaded: req.body.canBeDownloaded ?? false,
      minAgeRestriction: req.body.minAgeRestriction ?? null,
      createdAt: createdAt.toISOString(),
      publicationDate: publicationDate.toISOString(),
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

  app.put('/videos/:id', (req, res) => {
    const foundVideo = db.videos.find((v) => v.id === Number(req.params.id));
    if (!foundVideo) {
      res.sendStatus(HttpStatus.NotFound_404);
      return;
    }
      let errorsMessages: { message: string; field: string }[] = [];
      if (
        typeof req.body.title !== 'string' ||
        req.body.title.trim().length === 0 ||
        req.body.title.length > 40
      ) {
        errorsMessages.push({ message: 'Error title', field: 'title' });
      }
      if (
        typeof req.body.author !== 'string' ||
        req.body.author.trim().length === 0 ||
        req.body.author.length > 20
      ) {
        errorsMessages.push({ message: 'Error author', field: 'author' });
      }

      if (typeof req.body.canBeDownloaded !== 'boolean') {
        errorsMessages.push({
          message: 'Error canBeDownloaded',
          field: 'canBeDownloaded',
        });
      }
      if (
        req.body.minAgeRestriction !== null &&
        (typeof req.body.minAgeRestriction !== 'number' ||
          req.body.minAgeRestriction < 1 ||
          req.body.minAgeRestriction > 18)
      ) {
        errorsMessages.push({
          message: 'Error minAgeRestriction',
          field: 'minAgeRestriction',
        });
      }

      if (
        !Array.isArray(req.body.availableResolutions) ||
        req.body.availableResolutions.length === 0 ||
        !req.body.availableResolutions.every((r:Resolution) => Object.values(Resolution).includes(r))
      )
      {
        errorsMessages.push({
          message: 'Error availableResolutions',
          field: 'availableResolutions',
        });
      }

      if (
        typeof req.body.publicationDate !== 'string' ||
        isNaN(Date.parse(req.body.publicationDate))
      ) {
          errorsMessages.push( {
            message: 'Error publicationDate',
            field: 'publicationDate',
        } )
      }

      if (
        errorsMessages.length > 0
      ) {
        res.status(HttpStatus.BadRequest_400).json({ errorsMessages })
        return;
      }




      foundVideo.title = req.body.title;
      foundVideo.author = req.body.author;
      foundVideo.availableResolutions = req.body.availableResolutions;
      foundVideo.canBeDownloaded = req.body.canBeDownloaded;
      foundVideo.minAgeRestriction = req.body.minAgeRestriction;
      foundVideo.publicationDate = req.body.publicationDate;


      return res.sendStatus(HttpStatus.NoContent_204);

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
