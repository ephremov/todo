import React from 'react';

function TodoList({ todos, toggleTodo, deleteTodo }) {
  if (todos.length === 0) {
    return <p className="no-todos">Задач пока нет!</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          <div className="todo-info">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id, !todo.completed)}
              className="todo-checkbox"
            />
            <span className="todo-title">{todo.title}</span>
          </div>
          <button 
            onClick={() => deleteTodo(todo.id)} 
            className="delete-button"
          >
            Удалить
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;