import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const navigate = useNavigate();
 
  const handleLogin = () => {
    // Dummy login logic
    // You can use email/password for authentication
    (email.toLocaleLowerCase()==="testuser@gmail.com".toLocaleLowerCase() && 
    password.toLocaleLowerCase()==="testuser123".toLocaleLowerCase()) ? navigate('/view_expense') : wrongCredential() 
  };
  const wrongCredential=()=>{
    setEmail("")
    setPassword("")
    navigate('/login')
  }
  

  return (
    <div className=" flex flex-col items-center justify-center h-screen ">
    <div className='border-2 p-10 border-gray-300 bg-slate-100 rounded-lg'>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <div className="flex flex-col">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 mb-2 border rounded-lg w-72"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-4 border rounded-lg w-72"
        />
        <button onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded">
          Login
        </button>
        <a href=''>Forgot password</a>
      </div>
    </div>
  </div>
  );
};

export default Login;
