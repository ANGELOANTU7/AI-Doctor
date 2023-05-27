import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import SkinRecord from './SkinRecord';
import { Link } from 'react-router-dom';
import Throatcheck from './Throatcheck';
import EyeRecord from './EyeRecord';
import Emotionchart from './Emotionchart';

const Dashboard = () => {
  return (
    <div>
      <div className='bg-emerald-400 w-screen h-screen'>
        
        <h1 className='text-5xl text-white text-center pt-8 pb-8 font-semibold'>Patient Dashboard</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-6'>
          <motion.div
            className='bg-slate-50 rounded-lg shadow-lg p-4'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='text-lg font-semibold mb-2'>Patient Details</h2>
            <p className='text-gray-500'>
              Name: Harshed Abdulla
            </p>
            <p className='text-gray-500'>
              Age: 22
            </p>
            <p className='text-gray-500'>
              Gender: Male
            </p>
            <p className='text-gray-500'>
              Contact Info: 1234567890
            </p>
            <p className='text-gray-500'>
              Location: Bangalore
            </p>
            <p className='text-gray-500'>
              BMI: 22
            </p>
            <p className='text-gray-500'>
              Past History: None
            </p>
          </motion.div>

          <motion.div
            className='bg-slate-50 rounded-lg shadow-lg p-4'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className='text-lg font-semibold mb-2'>Test details</h2>
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
