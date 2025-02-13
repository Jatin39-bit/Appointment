import DoctorNavbar from '../components/DoctorNavbar'
import Footer from '../components/Footer'
import DoctorsAppointments from './DoctorsAppointments'

const DoctorHome = () => {
  return (
    <div className='px-32'>
      <DoctorNavbar/>
      <DoctorsAppointments/>
      <Footer/>
    </div>
  )
}

export default DoctorHome