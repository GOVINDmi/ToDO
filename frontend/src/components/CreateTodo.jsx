import React, { useState } from 'react';
import '../CreateTodo.css';

export function CreateTodo({ setTodos, todos, token }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
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
      <button
        onClick={() => {
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
        }}
      >
        Add todo
      </button>
    </div>
  );
}
