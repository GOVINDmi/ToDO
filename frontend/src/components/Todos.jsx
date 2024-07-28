import React from 'react';
import '../Todos.css';

export function Todos({ todos, markAsCompleted, deleteTodo, startEditing }) {
  return (
    <div className="todos">
      {todos.map((todo) => (
        <div className="todo-item" key={todo._id}>
          <h1>{todo.title}</h1>
          <h2>{todo.description}</h2>
          <button
            className="complete-button"
            onClick={() => markAsCompleted(todo._id, { ...todo, completed: true })}
            disabled={todo.completed}
          >
            {todo.completed ? "Completed" : "Mark as completed"}
          </button>
          <button
            className="delete-button"
            onClick={() => deleteTodo(todo._id)}
            disabled={!todo.completed}
          >
            Delete
          </button>
          <button
            className="edit-button"
            onClick={() => startEditing(todo)}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}