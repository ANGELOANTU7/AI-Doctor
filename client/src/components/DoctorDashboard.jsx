import React, { useState } from 'react';;
import { motion } from 'framer-motion';
import p1 from '../assets/p1.png'
import p2 from '../assets/p2.png';


const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([
        { id: 1, patientName: 'Sameer', disease: 'Flu', severity: 'Mild', completed: false },
        { id: 2, patientName: 'Harshed', disease: 'Tuberculosis', severity: 'High', completed: false },
        { id: 3, patientName: 'Manu', disease: 'High-Fever', severity: 'Mild', completed: false },
        { id: 4, patientName: 'Ravi', disease: 'Cancer', severity: 'Mild', completed: false },
      ]);
    
      const handleCompleteAppointment = (id) => {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === id ? { ...appointment, completed: true } : appointment
          )
        );
      };
    
      const handleCancelAppointment = (id) => {
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== id)
        );
      };
    
      const [prescriptions, setPrescriptions] = useState([
        { id: 1, patientName: 'John Doe', prescriptionImage: p1, approved: false },
        { id: 2, patientName: 'Jane Smith', prescriptionImage: p2, approved: false },
      ]);
    
      const handleApprovePrescription = (id) => {
        setPrescriptions((prevPrescriptions) =>
          prevPrescriptions.map((prescription) =>
            prescription.id === id ? { ...prescription, approved: true } : prescription
          )
        );
      };
    
      const handleRejectPrescription = (id) => {
        setPrescriptions((prevPrescriptions) =>
          prevPrescriptions.filter((prescription) => prescription.id !== id)
        );
      };


        const handleDownloadPrescription = (prescriptionImage) => {
            const link = document.createElement('a');
            link.href = prescriptionImage;
            link.download = 'prescription.png';
            link.click();
        };
    
  return (
    <div>
      <div className='bg-emerald-400 w-screen h-screen'>
        
        <h1 className='text-5xl text-white text-center pt-8 pb-8 font-semibold'>Doctor Dashboard</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-6'>
          <motion.div
            className='bg-slate-50 rounded-lg shadow-lg p-4'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='text-lg font-semibold mb-2'>Profile</h2>
            <p className='text-gray-500'>
              Name: Dr. Denny
            </p>
            <p className='text-gray-500'>
              Age: 32
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
                Specialization: Cardiologist
            </p>
            <p className='text-gray-500'>
                Experience: 5 years
            </p>
            <p className='text-gray-500'>
                Rating: 4.5
            </p>            
          </motion.div>

          <motion.div
            className='bg-slate-50 rounded-lg shadow-lg p-4'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className='text-lg font-semibold mb-2'>Upcoming appointments</h2>
      {appointments.map((appointment) => (
        <div key={appointment.id} className='flex items-center justify-between'>
          <div>
            <p className='text-gray-800'>{appointment.patientName}</p>
            <p className='text-gray-600'>
              Disease: {appointment.disease}, Severity: {appointment.severity}
            </p>
          </div>
          <div className='flex items-center'>
            {!appointment.completed && (
              <>
                <button
                  className='mr-2 text-green-500'
                  onClick={() => handleCompleteAppointment(appointment.id)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M17.707 6.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 13.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
                <button className='text-red-500' onClick={() => handleCancelAppointment(appointment.id)}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M14.879 5.293a1 1 0 010 1.414L11.414 10l3.465 3.293a1 1 0 11-1.414 1.414L10 11.414l-3.293 3.465a1 1 0 01-1.414-1.414L8.586 10 5.121 6.707a1 1 0 011.414-1.414L10 8.586l3.293-3.465a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </>
            )}
            {appointment.completed && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 text-green-500'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 6.293a1 1 0 010 1.414l-9 9a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l8.293-8.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            )}
          </div>
        </div>
      ))}


            {/* Add test details content here */}
          </motion.div>

          <motion.div
      className='bg-slate-50 rounded-lg shadow-lg p-4'
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className='text-lg font-semibold mb-2'>Approve prescription</h2>
      {prescriptions.map((prescription) => (
        <div key={prescription.id} className='flex items-center justify-between'>
          <div className='flex items-center'>
          <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 text-gray-800 mr-2 cursor-pointer'
                viewBox='0 0 20 20'
                fill='currentColor'
                onClick={() => handleDownloadPrescription(prescription.prescriptionImage)}
              >
              <path
                fillRule='evenodd'
                d='M14 3h4a1 1 0 011 1v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4a1 1 0 011-1h4V1a1 1 0 011-1h4a1 1 0 011 1v2zm-4 2H6v12h8V5zM2 8h16v1a1 1 0 01-1 1H3a1 1 0 01-1-1V8zm1-4h12V3H3v1z'
                clipRule='evenodd'
              />
            </svg>
            <p className='text-gray-800'>{prescription.patientName}</p>
          </div>
          <div className='flex items-center'>
            {!prescription.approved && (
              <>
                <button
                  className='mr-2 text-green-500'
                  onClick={() => handleApprovePrescription(prescription.id)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M17.707 6.293a1 1 0 010 1.414l-9 9a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 8.586l3.293-3.465a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
                <button
                  className='text-red-500'
                  onClick={() => handleRejectPrescription(prescription.id)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M6.707 5.293a1 1 0 010 1.414L5.414 8l1.293 1.293a1 1 0 11-1.414 1.414L4 9.414l-1.293 1.293a1 1 0 11-1.414-1.414L2.586 8 1.293 6.707a1 1 0 111.414-1.414L4 6.586l1.293-1.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </>
            )}
            {prescription.approved && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 text-green-500'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 6.293a1 1 0 010 1.414l-9 9a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l8.293-8.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            )}
          </div>
        </div>
      ))}
    </motion.div>
        </div>
      </div>
    </div>
  );
};


export default DoctorDashboard
