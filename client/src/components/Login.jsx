import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../assets/87845-hello.json';

const Login = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md mx-auto p-4 bg-slate-50 rounded shadow text-center">
      <Lottie animationData={animationData} style={{ width: 300, height: 200 }} />
        <h2 className="text-2xl font-bold mb-4">Login as</h2>
        <div className="flex justify-between">
          <Link
            to="/doctorlogin"
            className={`${
              selectedOption === 'doctor' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            } p-4 rounded w-1/2 mr-2`}
            onClick={() => handleOptionClick('doctor')}
          >
            Doctor
          </Link>
          <Link
            to="/patientlogin"
            className={`${
              selectedOption === 'patient' ? 'bg-green-500 text-white' : 'bg-gray-200'
            } p-4 rounded w-1/2 ml-2`}
            onClick={() => handleOptionClick('patient')}
          >
            Patient
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
