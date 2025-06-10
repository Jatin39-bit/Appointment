/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js';

const MyAppointments = () => {
  const token=localStorage.getItem('token')
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading]=useState(true)
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const stripePromise = loadStripe("pk_test_51QaXV9B2httRzIonYLAIL0vYNulqsEBMZ0Sc5py7y5I69iqhKFQIHbBCYV8YWoZfxpZ03S407CtELW9wmi9HVLZN00Qq1dpcLf");

  useEffect(() => {
    async function getAppointments(){
    try{
        const response= await axios.get(`${import.meta.env.VITE_API_URL}user/getappointments`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )
      if(response.status!==200 || !response.data){
        localStorage.removeItem('token')
        navigate('/user/login')
      } else {
        setAppointments(Array.isArray(response.data) ? response.data : []);
        console.log(response.data)
      }
      setLoading(false)
    }catch(error){
      console.log(error)
    }
  }
  getAppointments()
  }
  , [token])

  const cancelAppointment=async(id)=>{
    try{
      const response= await axios.delete(`${import.meta.env.VITE_API_URL}user/cancelappointment/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(response.status!==200 || !response.data){
        localStorage.removeItem('token')
        navigate('/user/login')
      }
      if(response.status===200){
        const newAppointments=appointments.filter((appointment)=>appointment._id!==id)
        setAppointments(newAppointments)
      }
    }catch(error){
      console.log(error)
    }
  }

  const handlePayment = async (appointmentId) => {
    const stripe = await stripePromise;
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}user/create-checkout-session`, {
        appointmentId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const sessionId = response.data.id;
      const result = await stripe.redirectToCheckout({ sessionId });
      if (result.error) {
        console.error(result.error.message);
      } else {
        // Handle successful payment
        await axios.post(`${import.meta.env.VITE_API_URL}user/update-appointment-status`, {
          appointmentId,
          status: 'Paid'
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Optionally, update the local state to reflect the payment status
        const updatedAppointments = appointments.map(appointment =>
          appointment._id === appointmentId ? { ...appointment, status: 'Paid' } : appointment
        );
        setAppointments(updatedAppointments);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-4 sm:px-8 md:px-16 lg:px-32">
        <Navbar/>
        <p className="pb-3 mt-12 text-lg font-medium text-gray-600 border-b">My appointments</p>
        <div className="py-6">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <h1 className="text-xl font-semibold text-gray-600">Loading...</h1>
            </div>
          ) : appointments?.length > 0 ? (
            <div className="space-y-6">
              {appointments?.map((appointment) => (
                <div key={appointment._id} className="flex flex-col md:flex-row items-start gap-6 p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-all duration-300">
                  <div className="w-full md:w-48 h-48 flex-shrink-0">
                    <img 
                      className="w-full h-full object-cover rounded-lg" 
                      src={appointment.doctor.profilePicture} 
                      alt={appointment.doctor.name}
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <p className="text-xl font-semibold text-gray-900">{appointment.doctor.name}</p>
                      <p className="text-lg text-gray-600">{appointment.doctor.specialization}</p>
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">Address:</p>
                      <p className="text-gray-600">{appointment.doctor.clinicAddress}</p>
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">Date & Time:</p>
                      <p className="text-gray-600">
                        {appointment.date} {monthNames[new Date().getMonth()]} {new Date().getFullYear()} | {appointment.timeslot}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <p className="text-xl font-semibold text-gray-600">No appointments found</p>
              <p className="text-gray-500 mt-2">Book an appointment with our doctors</p>
            </div>
          )}
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  )
}

export default MyAppointments