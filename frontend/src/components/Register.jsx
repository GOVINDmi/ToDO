import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/auth/SignUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    setPassword("");
    setUsername("");
    
    alert(data.msg);
    navigate('/login'); // Redirect to login page after successful signup
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
     <h1>SignUp</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">SignUp</button>
    </form>
  );
}

export default Register;
