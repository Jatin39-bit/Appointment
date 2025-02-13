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
    <div className='px-32'>
        <Navbar/>
        <p className="pb-3 mt-12 text-lg font-medium text-gray-600 border-b">My appointments</p>
              <div className="grid grid-cols-[1fr] gap-4 max-md:flex  sm:gap-6 py-4 border-b">
                  {loading ? (<h1>Loading...</h1>) :( appointments?.map((appointment)=>(
                    <div key={appointment._id} className='flex  justify-between items-center gap-4 border-b py-4'>
                    <div>
                    <img className="w-36 rounded-lg bg-[#EAEFFF]" src={appointment.doctor.profilePicture} alt=""/>
                    </div>
                    <div className="flex-1 text-sm text-[#5E5E5E]">
                    <p className="text-[#262626] text-base font-semibold">{appointment.doctor.name}</p>
                    <p>{appointment.doctor.specialization}</p>
                    <p className="text-[#464646] font-medium mt-1">Address:</p>
                    <p className="">{appointment.doctor.clinicAddress}</p>
                    <p className=" mt-1"><span className="text-sm text-[#3C3C3C] font-medium">Date &amp; Time:</span> {appointment.date} {monthNames[new Date().getMonth()]} {new Date().getFullYear()} |  {appointment.timeslot}</p>
                </div>
                <div className="flex flex-col gap-2 justify-end text-sm text-center">
                    <button 
                      className={`text-[#696969] sm:min-w-48 py-2 border rounded ${appointment.status === "Pending" ? "hover:bg-blue-600 hover:text-white" : "bg-green-600 text-white cursor-not-allowed"}`}
                      onClick={() => appointment.status === "Pending" && handlePayment(appointment._id)}
                      disabled={appointment.status !== "Pending"}
                    >
                      {appointment.status === "Pending" ? "Pay Online" : appointment.status}
                    </button>
                    {appointment.status !== "Paid" && (
                      <button 
                        className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white"
                        onClick={() => cancelAppointment(appointment._id)}
                      >
                        Cancel appointment
                      </button>
                    )}
                </div>
                    </div>
                  )))}
        </div>
        <Footer/>
    </div>
  )
}

export default MyAppointments