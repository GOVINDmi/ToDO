import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import { CreateTodo } from './components/CreateTodo';
import { Todos } from './components/Todos';
import EditTodo from './components/EditTodo';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false); // Track login status

  useEffect(() => {
    if (token) {
      fetch("http://localhost:3000/todo", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(async function (res) {
        const response = await res.json();
        setTodos(response.todos);
      });
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsLoggedIn(false); // Update login status upon logout
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

  const startEditing = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
  };

  const editTodo = (id, updatedTodo) => {
    fetch(`http://localhost:3000/completed/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTodo),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then(async function (res) {
      const response = await res.json();
      alert(response.msg);
      setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
      setIsEditing(false);
      setCurrentTodo({});
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <Router>
      {isLoggedIn && (<><button className="logout-button" onClick={logout}>Logout</button> <br></br> <br></br> </>)}
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login setToken={setToken} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        {isLoggedIn ? (
          <>
            <Route path="/create-todo" element={<CreateTodo setTodos={setTodos} todos={todos} token={token} startEditing={startEditing}  />} />
           
            <Route path="/edit-todo" element={<EditTodo currentTodo={currentTodo} editTodo={editTodo} setIsEditing={setIsEditing} />} />
            <Route path="*" element={<Navigate to="/create-todo" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
     
    </Router>
  );
}

export default App;
