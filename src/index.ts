import express from 'express';
import { setupApp } from './setupapp';

// создание приложения
export const app = express();
setupApp(app);

const jsonBodyMiddleWare = express.json();
app.use(jsonBodyMiddleWare);

// process — это глобальный объект в Node.js, который содержит информацию о текущем процессе выполнения.
// process.env — это объект, содержащий все переменные окружения, доступные вашему приложению.

// Локальный запуск (только для разработки)
if (process.env.NODE_ENV !== 'production') {
  const PORT = 5001;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

// Экспорт для Vercel (всегда)
module.exports = app;
// ф-ия listen - запускает сервер и начинает прослушивать входящие запросы на указанном порту.
// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });
