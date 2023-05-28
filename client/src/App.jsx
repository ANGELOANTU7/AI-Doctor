

import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./components/Login"
import DoctorLogin from "./components/DoctorLogin";
import PatientLogin from "./components/PatientLogin";
import PatientDashboard from "./components/PatientDashboard.jsx"
import WebcamRecorder from "./components/WebcamRecorder";
import Uploadt from "./components/Uploadt.jsx"
import Uploadz from "./components/Uploadz";
import Dashboard from "./components/Dashboard";
import Media from "./components/Media";
import EyeRecord from "./components/EyeRecord";
import SkinRecord from "./components/SkinRecord";
import Throatcheck from "./components/Throatcheck";
import Emotionchart from "./components/Emotionchart";
import DoctorDashboard from "./components/DoctorDashboard";
import Healthplan from "./components/Healthplan";
import Webcam from "./components/Webcam";
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
          <Route path="/uploadz" element={<Uploadz />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/media" element={<Media />} />
          <Route path="/eyerecord" element={<EyeRecord />} />
          <Route path="/skinrecord" element={<SkinRecord />} />
          <Route path="/throatcheck" element={<Throatcheck />} />
          <Route path="/emotionchart" element={<Emotionchart />} />
          <Route path="/doctordashboard" element={<DoctorDashboard />} />
          <Route path="/healthplan" element={<Healthplan />} />
          <Route path="/webcam" element={<Webcam />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;