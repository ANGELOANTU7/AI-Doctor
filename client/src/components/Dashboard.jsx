import React from 'react'
import Navbar from './Navbar'

const Dashboard = () => {

  return (
    <div>
      <div className='bg-emerald-500 w-screen h-screen mt-2'>
      <Navbar />
      
      <div className="bg-slate-50 rounded-lg shadow-lg p-4 mr-12 ml-12 mt-2">
          <h2 className="text-lg font-semibold ">Patient Details</h2>
          <p className="text-gray-500 mt-2">
            Name: Harshed Abdulla
          </p>
          <p className="text-gray-500 mt-2">
            Age: 22
          </p>
          <p className="text-gray-500 mt-2">
            Gender: Male
          </p>
          <p className="text-gray-500 mt-2">
            Contact Info: 1234567890
          </p>
          <p className="text-gray-500 mt-2">
            Location: Bangalore
          </p>
          <p className="text-gray-500 mt-2">
            BMI: 22
          </p>
          <p className="text-gray-500 mt-2">
            Past History: None
          </p>
      </div>

      </div>
    </div>
  )
}

export default Dashboard