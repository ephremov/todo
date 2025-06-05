import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API URL из переменной окружения или значение по умолчанию
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

  // Загрузка всех задач
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/todos`);
        setTodos(response.data);
        setError(null);
      } catch (err) {
        console.error('Ошибка при загрузке задач:', err);
        setError('Не удалось загрузить задачи. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [API_URL]);

  // Добавление новой задачи
  const addTodo = async (todoData) => {
    try {
      const response = await axios.post(`${API_URL}/todos`, todoData);
      setTodos([response.data, ...todos]);
      setError(null);
    } catch (err) {
      console.error('Ошибка при добавлении задачи:', err);
      setError('Не удалось добавить задачу. Пожалуйста, попробуйте позже.');
    }
  };

  // Переключение статуса задачи (выполнено/не выполнено)
  const toggleTodo = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/todos/${id}`, { completed });
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: response.data.completed } : todo
      ));
      setError(null);
    } catch (err) {
      console.error(`Ошибка при обновлении задачи ${id}:`, err);
      setError('Не удалось обновить задачу. Пожалуйста, попробуйте позже.');
    }
  };

  // Удаление задачи
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
      setError(null);
    } catch (err) {
      console.error(`Ошибка при удалении задачи ${id}:`, err);
      setError('Не удалось удалить задачу. Пожалуйста, попробуйте позже.');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Список задач</h1>
        <p className="app-subtitle">Управляйте своими делами легко и эффективно</p>
      </header>

      {error && <div className="error">{error}</div>}

      <TodoForm addTodo={addTodo} />
      
      {loading ? (
        <div className="loading">Загрузка задач...</div>
      ) : (
        <TodoList 
          todos={todos} 
          toggleTodo={toggleTodo} 
          deleteTodo={deleteTodo} 
        />
      )}
    </div>
  );
}

export default App;