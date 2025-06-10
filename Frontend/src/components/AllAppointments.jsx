/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import axios from 'axios'
import { useState, useEffect } from 'react'

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const AllAppointments = ({ appointmentss }) => {
  const token=localStorage.getItem('token')
  const [appointments, setAppointments] = useState([]) 

  useEffect(() => {
    setAppointments(appointmentss)
  }, [appointmentss])

  const cancelAppointment = async (id) => {
    console.log(id)
    try{
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}admin/cancelappointment/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(response.status===200){
        setAppointments(appointments.filter(appointment => appointment._id !== id))
      }
    } 
    catch(error){
      console.log(error)
    }
  }

  return (
    <div className="space-y-6">
      {appointments && appointments.length > 0 ? (
        appointments.map((appointment) => (
          <div 
            key={appointment._id} 
            className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <div className="w-full md:w-48 flex-shrink-0">
              <img 
                className="w-full h-48 object-cover rounded-lg" 
                src={appointment.doctor.profilePicture} 
                alt={appointment.doctor.name}
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <p className="text-lg font-semibold">Dr. {appointment.doctor.name}</p>
                  <p className="text-gray-600">{appointment.doctor.specialization}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">Patient: {appointment.user.name}</p>
                  <p className="text-sm text-gray-500">{appointment.user.email}</p>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-gray-700 font-medium">Address:</p>
                <p className="text-gray-600">{appointment.doctor.clinicAddress}</p>
              </div>
              <div className="pt-2">
                <p className="text-gray-700 font-medium">Date & Time:</p>
                <p className="text-gray-600">
                  {appointment.date} {monthNames[new Date().getMonth()]} {new Date().getFullYear()} | {appointment.timeslot}
                </p>
              </div>
              <div className="pt-4">
                <button 
                  className={`w-full sm:w-auto px-6 py-2 rounded-lg transition-colors duration-300 ${
                    appointment.status === "Pending"
                      ? "border border-gray-300 hover:bg-blue-600 hover:text-white"
                      : "bg-green-600 text-white cursor-not-allowed"
                  }`}
                  disabled={appointment.status !== "Pending"}
                >
                  {appointment.status}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <h1 className="text-xl font-semibold text-gray-600">No appointments found</h1>
        </div>
      )}
    </div>
  );
};

export default AllAppointments;