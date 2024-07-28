import React, { useState, useEffect } from 'react';
import './App.css';
import { CreateTodo } from './components/CreateTodo';
import { Todos } from './components/Todos';
import { EditTodo } from './components/EditTodo';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const [token, setToken] = useState(null);

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


  const logout = (req,res)=> {
    console.log(req);
    console.log("Authentication",req.headers);
    setToken(null);
  };

  if (!token) {
    return (
      <div>
        <h1>Login</h1>
        <Login setToken={setToken} />
        <h1>SignUp</h1>
        <Register />
      </div>
    );
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <CreateTodo setTodos={setTodos} todos={todos} token={token} />
      {isEditing ? (
        <EditTodo
          currentTodo={currentTodo}
          editTodo={editTodo}
          setIsEditing={setIsEditing}
        />
      ) : (
        <Todos
          todos={todos}
          markAsCompleted={markAsCompleted}
          deleteTodo={deleteTodo}
          startEditing={startEditing}
        />
      )}
    </div>
  );
}

export default App;
