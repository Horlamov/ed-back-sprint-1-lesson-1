import express, { Express, Request, Response } from 'express';

export const setupApp = (app: Express) => {
  app.use(express.json()); //middleware express.json() парсит JSON в теле запроса и добавляет его как объект в свойство body запроса (req.body.).

  app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello world!');
  });

  app.get("/drivers", (req, res) => {
    // возвращаем всех водителей
    res.status(HttpStatus.Ok).send(db.drivers);
  });

  app.get("/drivers/:id", (req, res) => {
    // ищем водителя в бд по id
    const driver = db.drivers.find((d) => d.id === +req.params.id);
    if (!driver) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }
    // возвращаем ответ
    res.status(HttpStatus.Ok).send(driver);
  });

  app.post("/drivers", (req, res) => {
    //1) проверяем приходящие данные на валидность (добавим на следующем шаге)
    //2) создаем newDriver
    const lastDriver = db.drivers[db.drivers.length - 1];
    const newDriver: Driver = {
      id: lastDriver ? lastDriver.id + 1 : 1,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      vehicleMake: req.body.vehicleMake,
      vehicleModel: req.body.vehicleModel,
      vehicleYear: req.body.vehicleYear,
      vehicleLicensePlate: req.body.vehicleLicensePlate,
      vehicleDescription: req.body.vehicleDescription,
      vehicleFeatures: req.body.vehicleFeatures,
      createdAt: new Date(),
    };
    //3) добавляем newDriver в БД
    db.drivers.push(newDriver);
    //4) возвращаем ответ
    res.status(HttpStatus.Created).send(newDriver);
  });

  app.delete("/testing/all-data", (req, res) => {
    db.drivers = [];
    res.sendStatus(HttpStatus.NoContent);
  });



  return app;
};
