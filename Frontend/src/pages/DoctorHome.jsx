import DoctorNavbar from '../components/DoctorNavbar'
import Footer from '../components/Footer'
import DoctorsAppointments from './DoctorsAppointments'

const DoctorHome = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-4 sm:px-8 md:px-16 lg:px-32">
        <DoctorNavbar />
        <DoctorsAppointments />
      </div>
      <Footer className="mt-auto" />
    </div>
  )
}

export default DoctorHome