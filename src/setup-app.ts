import express, { Express, Request, Response } from 'express';
import { HttpStatus } from './core/types/http-status';
import { db } from './db/db';
import { Videos } from './core/types/type';

export const setupApp = (app: Express) => {
  app.use(express.json()); //middleware express.json() парсит JSON в теле запроса и добавляет его как объект в свойство body запроса (req.body.).

  app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello world!');
  });

  app.get('/videos', (req, res) => {
    // возвращаем всех водителей
    res.status(HttpStatus.Ok).send(db.videos);
  });

  app.get('/videos/:id', (req, res) => {
    // ищем водителя в бд по id
    const video = db.videos.find((v) => v.id === +req.params.id);
    if (!video) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }
    // возвращаем ответ
    res.status(HttpStatus.Ok).send(video);
  });

  app.post('/videos', (req, res) => {
    //1) проверяем приходящие данные на валидность (добавим на следующем шаге)
    //2) создаем newVideo
    const lastVideos = db.videos[db.videos.length - 1];
    const newVideos: Videos = {
      id: lastVideos ? lastVideos.id + 1 : 1,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      vehicleMake: req.body.vehicleMake,
      vehicleModel: req.body.vehicleModel,
      vehicleYear: req.body.vehicleYear,
      vehicleLicensePlate: req.body.vehicleLicensePlate,
      vehicleDescription: req.body.vehicleDescription,
      vehicleFeatures: req.body.vehicleFeatures,
      createdAt: req.body.vehicleFeatures,
    };
    //3) добавляем newVideos в БД
    db.videos.push(newVideos);
    //4) возвращаем ответ
    res.status(HttpStatus.Created).send(newVideos);
  });

  app.delete('/testing/all-data', (_req, res) => {
    db.videos = [];
    res.sendStatus(HttpStatus.NoContent);
  });

  return app;
};
