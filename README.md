# Todo 
![Скриншот](https://drive.google.com/uc?export=view&id=1rjuMAtN9UprDtKSnPEgUZjlu6NyXTRLo)


## Описание

Todo — это простое веб-приложение для управления задачами (todo), разработанное с использованием Node.js, PostgreSQL и React. Приложение состоит из бэкенда (API на Node.js + Express), фронтенда (React) и базы данных PostgreSQL. Все сервисы запускаются в контейнерах Docker.

## Технологии

- **Бэкенд:** Node.js, Express
- **База данных:** PostgreSQL
- **Фронтенд:** React
- **Контейнеризация:** Docker, Docker Compose

## Быстрый старт (через Docker)

1. Клонируйте репозиторий:
   ```sh
   git clone https://github.com/ephremov/todo.git
   cd todo
   ```

2. Запустите все сервисы:
   ```sh
   docker compose up --build
   ```

3. Приложение будет доступно:
   - Фронтенд: [http://localhost:3000](http://localhost:3000)
   - Бэкенд API: [http://localhost:4000/api](http://localhost:4000/api)
   - PostgreSQL: порт 5432

## Локальный запуск без Docker

### Бэкенд

1. Перейдите в папку сервера:
   ```sh
   cd server
   ```
2. Установите зависимости:
   ```sh
   npm install
   ```
3. Запустите сервер:
   ```sh
   npm start
   ```

### Фронтенд

1. Перейдите в папку клиента:
   ```sh
   cd client
   ```
2. Установите зависимости:
   ```sh
   npm install
   ```
3. Запустите приложение:
   ```sh
   npm start
   ```
