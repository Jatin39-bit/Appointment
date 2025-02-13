/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import axios from 'axios'
import { useState, useEffect } from 'react'


const AllAppointments = (props) => {
    const token=localStorage.getItem('token')
    const [appointmentss, setAppointmentss] = useState([]) 

    useEffect(() => {
      setAppointmentss(props.appointments)
    }, [props.appointments])

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
        ];
    const cancelAppointment = async (id) => {
        console.log(id)
        try{
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}admin/cancelappointment/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(response.status===200){
                setAppointmentss(props.appointments.filter(appointment => appointment._id !== id))
            }
        } 
        catch(error){
            console.log(error)
        }
    }

  return (
    <div className="grid grid-cols-[1fr] gap-4 max-md:flex  sm:gap-6 py-4 border-b">
                  {appointmentss && appointmentss.length > 0 ? (appointmentss.map((appointment) => (
      <div key={appointment._id} className="flex justify-between items-center gap-4 border-b py-4">
        <div>
          <img className="w-36 rounded-lg bg-[#EAEFFF]" src={appointment.doctor.profilePicture} alt=""/>
        </div>
        <div className="flex-1 text-sm text-[#5E5E5E]">
          <p className="text-[#262626] text-base font-semibold">Doctor's Name : {appointment.doctor.name}</p>
          <p className="text-[#262626] text-base font-semibold">Patient's Name : {appointment.user.name}</p>
          <p>{appointment.doctor.specialization}</p>
          <p className="text-[#464646] font-medium mt-1">Address:</p>
          <p>{appointment.doctor.clinicAddress}</p>
          <p className="text-[#262626] text-base font-semibold">Patient's Email Address : {appointment.user.email}</p>
          <p className="mt-1">
            <span className="text-sm text-[#3C3C3C] font-medium">Date &amp; Time:</span> 
            {appointment.date} {monthNames[new Date().getMonth()]} {new Date().getFullYear()} | {appointment.timeslot}
          </p>
        </div>
        <div className="flex flex-col gap-2 justify-end text-sm text-center">
        <button 
                      className={`text-[#696969] sm:min-w-48 py-2 border rounded ${appointment.status === "Pending" ? "hover:bg-blue-600 hover:text-white" : "bg-green-600 text-white cursor-not-allowed"}`}
                      disabled={appointment.status !== "Pending"}
                    >
                      {appointment.status}
                    </button>
          <button className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white"
            onClick={()=>cancelAppointment(appointment._id)}
          >
            Cancel appointment
          </button>
        </div>
      </div>
    ))
  ) : (
    <div className='h-[30vh] w-full flex justify-center items-center text-3xl'>No appointments currently</div>
  )
}
        </div>
  )
}

export default AllAppointments