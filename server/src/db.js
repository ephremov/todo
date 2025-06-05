const { Pool } = require('pg');

// Создание пула соединений с базой данных PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'todo_db',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

// Проверка соединения с базой
pool.connect()
  .then(() => console.log('PostgreSQL успешно подключен'))
  .catch(err => console.error('Ошибка подключения к PostgreSQL:', err));

module.exports = {
  query: (text, params) => pool.query(text, params),
};