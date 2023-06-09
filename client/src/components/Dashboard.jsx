import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SkinRecord from './SkinRecord';
import Throatcheck from './Throatcheck';
import EyeRecord from './EyeRecord';
import Emotionchart from './Emotionchart';
import axios from 'axios';
import Result from './Result';

const API_URL = 'http://192.168.237.75:8081';

const Dashboard = () => {
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`http://192.168.237.129:8000/get-patient-data`);
        const patientDetails = response.data.data;
        setPatientData(patientDetails);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        // Handle errors
      }
    };

    fetchPatientData();
  }, []);

  return (
    <div>
      <div className='bg-emerald-400 w-screen h-screen'>
        
        <h1 className='text-5xl text-white text-center pt-8 pb-8 font-semibold'>Patient Dashboard</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-6'>
          {patientData && (
            <motion.div
              className='bg-slate-50 rounded-lg shadow-lg p-4'
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className='text-lg font-semibold mb-2'>Patient Details</h2>
              <p className='text-gray-500'>
                Name: {patientData.Name}
              </p>
              <p className='text-gray-500'>
                Age: {patientData.Age}
              </p>
              <p className='text-gray-500'>
                Gender: {patientData.Gender}
              </p>
              <p className='text-gray-500'>
                Contact Info: {patientData['Contact Info']}
              </p>
              <p className='text-gray-500'>
                Location: {patientData.Location}
              </p>
              <p className='text-gray-500'>
                Height: {patientData.Height}
              </p>
              <p className='text-gray-500'>
                Weight: {patientData.Weight}
              </p>
              <p className='text-gray-500'>
                Past History: None
              </p>
            </motion.div>
          )}
          <motion.div
            className='bg-slate-50 rounded-lg shadow-lg p-4'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className='text-lg font-semibold mb-2'>Test details</h2>
            
           Chief Complaint:
The patient presents with complaints of burning sensation in the feet and poorly controlled diabetes.

Assessment:
Upon examination, it is noted that the patient has a history of hypertension and type 2 diabetes. The patient reports a burning sensation in the feet, which could be indicative of peripheral neuropathy associated with uncontrolled diabetes. Further evaluation and management are recommended to address the patient's symptoms and optimize diabetes control.

Recommendations:
1. Diabetic foot care: The patient should be advised to practice proper foot hygiene and take necessary precautions to prevent complications associated with diabetes.
2. Glycemic control: Adjustments in the patient's diabetes management plan should be made to achieve better control of blood glucose levels. This may include lifestyle modifications, medication adjustments, and regular monitoring of blood sugar levels.
3. Referral to a specialist: Consider referring the patient to a specialist for further evaluation and management of diabetic neuropathy.
            {/* Add test details content here */}
          </motion.div>

          <motion.div
            className='bg-slate-50 rounded-lg shadow-lg p-4'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className='text-lg font-semibold mb-2'>Emotion Analysis</h2>
            <div className='flex justify-center'>
            <Emotionchart />
            </div>
            {/* Add emotion analysis content here */}
          </motion.div>

          <motion.div
            className='bg-slate-50 rounded-lg shadow-lg p-4'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className='text-lg font-semibold mb-2'>Skin Checkup</h2>
            <SkinRecord />
          </motion.div>

          <motion.div
            className='bg-slate-50 rounded-lg shadow-lg p-4'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className='text-lg font-semibold mb-2'>Eye Checkup</h2>
            <EyeRecord />
          </motion.div>

          <motion.div
            className='bg-slate-50 rounded-lg shadow-lg p-4'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <h2 className='text-lg font-semibold mb-2'>Throat Checkup</h2>
            <Throatcheck />
          </motion.div>
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
