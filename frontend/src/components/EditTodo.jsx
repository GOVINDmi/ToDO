import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../EditTodo.css';

export function EditTodo({ currentTodo, editTodo }) {
  const [title, setTitle] = useState(currentTodo.title);
  const [description, setDescription] = useState(currentTodo.description);
  const navigate = useNavigate();

  const handleSave = () => {
    editTodo(currentTodo._id, { ...currentTodo, title, description, completed: false });
    navigate('/create-todo'); // Navigate to CreateTodo component after saving changes
  };

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
      <button onClick={handleSave}>
        Save
      </button>
      <button
        className="cancel-button"
        onClick={() => navigate('/create-todo')}
      >
        Cancel
      </button>
    </div>
  );
}

export default EditTodo;
