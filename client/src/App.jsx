

import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./components/Login"
import DoctorLogin from "./components/DoctorLogin";
import PatientLogin from "./components/PatientLogin";
import PatientDashboard from "./components/PatientDashboard.jsx"
import WebcamRecorder from "./components/WebcamRecorder";
import Uploadt from "./components/Uploadt.jsx"
import MediaRecord from "./components/MediaRecord";
import Uploadz from "./components/Uploadz";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/doctorlogin" element={<DoctorLogin/>} />
          <Route path="/patientlogin" element={<PatientLogin/>} />
          <Route path="/patientdashboard" element={<PatientDashboard />} />
         <Route path="/consult" element={<WebcamRecorder />} />
          <Route path="/uploadt" element={<Uploadt />} />
          <Route path="/media" element={<MediaRecord />} />
          <Route path="/uploadz" element={<Uploadz />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;