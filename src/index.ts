import express from 'express';
import { setupApp } from './setupapp';

export const app = express();
setupApp(app);

const PORT = process.env.PORT || 5001;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Для Vercel + сохранение { app } для тестов
// @ts-ignore
module.exports = app;
// @ts-ignore
module.exports.app = app;


//