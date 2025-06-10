/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const DoctorsAppointments = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        async function getAppointments() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}doctor/getappointments`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if(response.status !== 200 || !response.data) {
                    localStorage.removeItem('token')
                    navigate('/doctor/login')
                } else {
                    setAppointments(Array.isArray(response.data) ? response.data : []);
                }
                setLoading(false)
            } catch(error) {
                console.log(error)
            }
        }
        getAppointments()
    }, [token])

    const cancelAppointment = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}doctor/cancelappointment/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status === 200) {
                setAppointments(appointments.filter(appointment => appointment._id !== id))
            }
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-medium text-gray-700 pb-3 mt-8 border-b">
                My Appointments
            </h2>
            
            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <h1 className="text-xl font-semibold text-gray-600">Loading...</h1>
                </div>
            ) : appointments && appointments.length > 0 ? (
                <div className="space-y-6">
                    {appointments.map((appointment) => (
                        <div 
                            key={appointment._id} 
                            className="flex flex-col md:flex-row items-start gap-6 p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                            <div className="w-full md:w-48 h-48 flex-shrink-0">
                                <img 
                                    className="w-full h-full object-cover rounded-lg" 
                                    src={appointment.user.profilePicture} 
                                    alt={appointment.user.name}
                                />
                            </div>
                            <div className="flex-1 space-y-4">
                                <div>
                                    <p className="text-xl font-semibold text-gray-900">{appointment.user.name}</p>
                                    <p className="text-gray-600">{appointment.user.email}</p>
                                </div>
                                <div>
                                    <p className="text-gray-700 font-medium">Date & Time:</p>
                                    <p className="text-gray-600">
                                        {appointment.date} {monthNames[new Date().getMonth()]} {new Date().getFullYear()} | {appointment.timeslot}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => handleStatusChange(appointment._id, "Accepted")}
                                        className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
                                            appointment.status === "Accepted"
                                                ? "bg-green-600 text-white cursor-not-allowed"
                                                : "border border-gray-300 hover:bg-green-600 hover:text-white"
                                        }`}
                                        disabled={appointment.status === "Accepted"}
                                    >
                                        {appointment.status === "Accepted" ? "Accepted" : "Accept"}
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(appointment._id, "Rejected")}
                                        className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
                                            appointment.status === "Rejected"
                                                ? "bg-red-600 text-white cursor-not-allowed"
                                                : "border border-gray-300 hover:bg-red-600 hover:text-white"
                                        }`}
                                        disabled={appointment.status === "Rejected"}
                                    >
                                        {appointment.status === "Rejected" ? "Rejected" : "Reject"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                    <p className="text-xl font-semibold text-gray-600">No appointments found</p>
                    <p className="text-gray-500 mt-2">You don't have any appointments yet</p>
                </div>
            )}
        </div>
    )
}

export default DoctorsAppointments