

import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./components/Login"
import DoctorLogin from "./components/DoctorLogin";
import PatientLogin from "./components/PatientLogin";
import PatientDashboard from "./components/PatientDashboard.jsx"
import Uploadp from "./components/Uploadp.jsx"
import Uploadpa from "./components/Uploadpa.jsx"

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/doctorlogin" element={<DoctorLogin/>} />
          <Route path="/patientlogin" element={<PatientLogin/>} />
          <Route path="/patientdashboard" element={<PatientDashboard />} />
         <Route path="/uploadpa" element={<Uploadpa />} />
         <Route path="/uploadp" element={<Uploadp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;