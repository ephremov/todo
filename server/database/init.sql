CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Добавление нескольких задач для примера
INSERT INTO todos (title, completed) VALUES 
  ('Изучить Docker', false),
  ('Освоить React', false),
  ('Настроить PostgreSQL', true);