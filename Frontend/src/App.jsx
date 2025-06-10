import './App.css'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import AdminHome from './pages/AdminHome'
import AdminProtectedWrapper from './components/AdminProtectedWrapper'
import DoctorHome from './pages/DoctorHome'
import DoctorProtectedWrapper from './components/DoctorProtectedWrapper'
import UserHome from './pages/UserHome'
import UserProtectedWrapper from './components/UserProtectedWrapper'
import UserLogin from './pages/UserLogin'
import AdminLogin from './pages/AdminLogin'
import DoctorLogin from './pages/DoctorLogin'
import UserSignup from './pages/UserSignup'
import AdminSignup from './pages/AdminSignup'
import DoctorSignup from './pages/DoctorSignup'
import Main from './pages/Main'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Doctor from './pages/Doctor'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import DoctorProfile from './pages/DoctorProfile'
import DoctorAppointments from './pages/DoctorsAppointments'
import Success from './components/Success'
import Cancel from './components/Cancel'
import { useState } from 'react'

function App() {
  const [filter, setFilter] = useState("");

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main setFilter={setFilter}/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/cancel" element={<Cancel/>}/>
        <Route path="/appointment/:id" element={<Appointment/>}/>
        <Route path="/doctor" element={<Doctor filter={filter}/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/user/login" element={<UserLogin/>}/>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/doctor/login" element={<DoctorLogin/>}/>
        <Route path="/user/signup" element={<UserSignup/>}/>
        <Route path="/admin/signup" element={<AdminSignup/>}/>
        <Route path="/doctor/signup" element={<DoctorSignup/>}/>
        <Route path="/admin/home" element={<AdminProtectedWrapper><AdminHome/></AdminProtectedWrapper>}/>
        <Route path="/doctor/home" element={<DoctorProtectedWrapper><DoctorHome/></DoctorProtectedWrapper>}/>
        <Route path="/doctor/my-profile" element={<DoctorProtectedWrapper><DoctorProfile/></DoctorProtectedWrapper>}/>
        <Route path="/doctor/my-appointments" element={<DoctorProtectedWrapper><DoctorAppointments/></DoctorProtectedWrapper>}/>
        <Route path="/user/home" element={<UserProtectedWrapper><UserHome/></UserProtectedWrapper>}/>
        <Route path="/user/my-appointments" element={<UserProtectedWrapper><MyAppointments/></UserProtectedWrapper>}/>
        <Route path="/user/my-profile" element={<UserProtectedWrapper><MyProfile/></UserProtectedWrapper>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
