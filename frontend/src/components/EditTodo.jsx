import React, { useState } from 'react';
import '../EditTodo.css';

export function EditTodo({ currentTodo, editTodo, setIsEditing }) {
  const [title, setTitle] = useState(currentTodo.title);
  const [description, setDescription] = useState(currentTodo.description);

  return (
    <div className="edit-todo">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={() => {
          editTodo(currentTodo._id, { ...currentTodo, title, description, completed: false });
        }}
      >
        Save
      </button>
      <button
        className="cancel-button"
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </button>
    </div>
  );
}
