import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'

const Uploadt = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [location, setLocation] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [file, setFile] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'age') {
      setAge(value);
    } else if (name === 'gender') {
      setGender(value);
    } else if (name === 'contactInfo') {
      setContactInfo(value);
    } else if (name === 'location') {
      setLocation(value);
    } else if (name === 'height') {
      setHeight(value);
    } else if (name === 'weight') {
      setWeight(value);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('contactinfo', contactInfo);
    formData.append('location', location);
    formData.append('height', height);
    formData.append('weight', weight);
    formData.append('file', file);

    axios
      .post('http://192.168.39.129:8000/test-data', formData)
      .then((response) => {
        console.log('API Response:', response.data);
        // Handle the API response here
      })
      .catch((error) => {
        console.error('API Error:', error);
        // Handle errors
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-emerald-400">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-1/2"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl mb-6">Patient Form</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Age:
            <input
              type="text"
              name="age"
              value={age}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Gender:
            <input
              type="text"
              name="gender"
              value={gender}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Contact Info:
            <input
              type="text"
              name="contactInfo"
              value={contactInfo}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Location:
            <input
              type="text"
              name="location"
              value={location}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Height:
            <input
              type="text"
              name="height"
              value={height}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Weight:
            <input
              type="text"
              name="weight"
              value={weight}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            File:
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="mt-1 p-2"
            />
          </label>
        </div>
        <div className="flex justify-end">
            <Link to="/consult">
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          </Link>
        </div>
      </motion.form>
    </div>
  );
};

export default Uploadt;
