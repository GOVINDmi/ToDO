import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CreateTodo.css';
import '../Todos.css';

export function CreateTodo({ setTodos, todos, token, startEditing }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const addTodo = () => {
    fetch("http://localhost:3000/todo", {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then(async function (res) {
      const response = await res.json();
      alert("Added the todo");
      setTodos([...todos, { title, description, completed: false }]);
    });
  };

  const markAsCompleted = (id, todo) => {
    fetch(`http://localhost:3000/completed/${id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then(async function (res) {
      const response = await res.json();
      alert(response.msg);
      setTodos(todos.map(todo => todo._id === id ? { ...todo, completed: true } : todo));
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:3000/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then(async function (res) {
      const response = await res.json();
      alert(response.msg);
      setTodos(todos.filter(todo => todo._id !== id));
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <div className="create-todo">
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
        /><br />
        <button onClick={addTodo}>Add todo</button>
      </div>
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
              onClick={() => {
                startEditing(todo);
                navigate('/edit-todo');
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
