const express = require('express');
const router = express.Router();
const db = require('../db');

// Получить все задачи
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM todos ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении задач' });
  }
});

// Создать новую задачу
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Название задачи обязательно' });
    }
    
    const result = await db.query(
      'INSERT INTO todos (title) VALUES ($1) RETURNING *',
      [title]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при создании задачи' });
  }
});

// Обновить статус задачи
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { completed, title } = req.body;
    
    // Проверяем, существует ли задача
    const checkResult = await db.query('SELECT * FROM todos WHERE id = $1', [id]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Задача не найдена' });
    }
    
    let result;
    if (title !== undefined && completed !== undefined) {
      result = await db.query(
        'UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *',
        [title, completed, id]
      );
    } else if (title !== undefined) {
      result = await db.query(
        'UPDATE todos SET title = $1 WHERE id = $2 RETURNING *',
        [title, id]
      );
    } else if (completed !== undefined) {
      result = await db.query(
        'UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *',
        [completed, id]
      );
    } else {
      return res.status(400).json({ error: 'Не указаны данные для обновления' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при обновлении задачи' });
  }
});

// Удалить задачу
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Проверяем, существует ли задача
    const checkResult = await db.query('SELECT * FROM todos WHERE id = $1', [id]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Задача не найдена' });
    }
    
    await db.query('DELETE FROM todos WHERE id = $1', [id]);
    
    res.json({ message: 'Задача успешно удалена' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при удалении задачи' });
  }
});

module.exports = router;