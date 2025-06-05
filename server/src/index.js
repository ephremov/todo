const express = require('express');
const cors = require('cors');
const todosRoutes = require('./routes/todos');

// Инициализация приложения Express
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:3000', // разрешить запросы только с фронтенда
  credentials: true
}));

// Middleware
app.use(cors());
app.use(express.json());

// Маршруты
app.use('/api/todos', todosRoutes);

// Корневой маршрут для проверки работы API
app.get('/', (req, res) => {
  res.send('Сервер Todo API работает');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});