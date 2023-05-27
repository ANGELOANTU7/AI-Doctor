import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../assets/2649-patient-successfully-added.json';


const PatientLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // Dummy login logic
    if (username === 'patient' && password === 'password') {
      console.log('Patient login successful!');
      // Add your desired logic here after successful login
    } else {
      console.log('Patient login failed!');
      // Add your desired logic here after failed login
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-emerald-500 w-screen">
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow text-center">
      <Lottie animationData={animationData} style={{ width: 300, height: 200 }} />
        <h2 className="text-2xl font-bold mb-4">Patient Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <Link to="/patientdashboard">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default PatientLogin;
