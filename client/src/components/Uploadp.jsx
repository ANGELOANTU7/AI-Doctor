import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Uploadp = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [hasMedicalHistory, setHasMedicalHistory] = useState(false);
  const [prescriptionFile, setPrescriptionFile] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleContactChange = (event) => {
    setContact(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleMedicalHistoryChange = (event) => {
    setHasMedicalHistory(event.target.checked);
  };

  const handlePrescriptionUpload = (event) => {
    const file = event.target.files[0];
    setPrescriptionFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Display the entered form data
    console.log('Name:', name);
    console.log('Age:', age);
    console.log('Gender:', gender);
    console.log('Contact:', contact);
    console.log('Location:', location);
    console.log('Height:', height);
    console.log('Weight:', weight);
    console.log('Has Medical History:', hasMedicalHistory);
    if (prescriptionFile) {
      console.log('Prescription File:', prescriptionFile);
    }

    // Add your desired logic here for form submission
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-emerald-400 w-screen"
    >
      <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Patient Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
              Age
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="number"
              id="age"
              value={age}
              onChange={handleAgeChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
              Gender
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              id="gender"
              value={gender}
              onChange={handleGenderChange}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
              Contact Info
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              id="contact"
              value={contact}
              onChange={handleContactChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              Location
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              id="location"
              value={location}
              onChange={handleLocationChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="height">
              Height
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              id="height"
              value={height}
              onChange={handleHeightChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
              Weight
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              id="weight"
              value={weight}
              onChange={handleWeightChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Medical History
            </label>
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="hasMedicalHistory"
              checked={hasMedicalHistory}
              onChange={handleMedicalHistoryChange}
            />
            <span className="text-gray-700">Do you have any medical history?</span>
          </div>
          {hasMedicalHistory && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Prescription (PDF)
              </label>
              <input
                className="w-full"
                type="file"
                accept=".pdf"
                onChange={handlePrescriptionUpload}
              />
            </div>
          )}
          <Link to="/consultp">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </motion.button>
            </Link>
        </form>
      </div>
    </motion.div>
  );
};

export default Uploadp;
