/* eslint-disable no-unused-vars */
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const Appointment = () => {
  const [doctor, setDoctor] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState('');
  const timeSlots = [
    "10:00 am",
    "10:30 am",
    "11:00 am",
    "11:30 am",
    "12:00 pm",
    "12:30 pm",
    "01:00 pm",
    "01:30 pm",
    "02:00 pm",
    "02:30 pm",
    "03:00 pm",
    "03:30 pm",
    "04:00 pm",
    "04:30 pm",
    "05:00 pm",
    "05:30 pm",
    "06:00 pm",
    "06:30 pm",
    "07:00 pm",
    "07:30 pm",
    "08:00 pm",
    "08:30 pm",
  ];

  const dates=[]
  function upcomingDays(){
    for(let i=0;i<7;i++){
      const date=new Date()
      date.setDate(new Date().getDate()+i)
      dates.push(date.toDateString())
    }
  }


  const [daySlots, setDaySlots] = useState(upcomingDays());
  function formatDates(daySlots) {
    return daySlots.map(dateString => {
        const date = new Date(dateString); // Convert to Date object
        const day = date.toLocaleString('en-US', { weekday: 'short' }); // Full day name
        const month = date.toLocaleString('en-US', { month: 'short' }); // Full month name
        const dayNumber = date.getDate(); // Get the numeric day

        return `${day}, ${dayNumber} ${month}`; // Combine into desired format
    });
}

// Convert and log the formatted dates
const formattedDates = formatDates(dates);

  const { id } = useParams();
  useEffect(() => {
    const getDoctor = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}doctor/getdoctor/${id}`
        );
        setDoctor(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getDoctor();
  }, [id]);

  const navigate = useNavigate();

  const handleAppointment = async () => {

    if(!selectedDate || !selectedTime){
      alert("Please select a date and time");
      return;
    }

    if (!localStorage.getItem("token")) {
      alert("Please login to book an appointment");
      navigate("/user/login");
    }else{
      try{
        const res = await axios.post(`${import.meta.env.VITE_API_URL}user/bookappointment`, {
          doctorId: id,
          date: selectedDate,
          time: selectedTime,
        },{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        if(res.status === 401){
          navigate("/user/login");
        }
        console.log(res.data)
        alert("Appointment booked successfully");
      }catch(err){
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-4 sm:px-8 md:px-16 lg:px-32">
        <Navbar />
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* First div */}
          <div className="w-full md:w-1/3">
            <img
              src={doctor?.profilePicture}
              alt={doctor?.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="mt-4 space-y-2">
              <h2 className="text-xl font-semibold">{doctor?.name}</h2>
              <p className="text-gray-600">{doctor?.specialization}</p>
              <p className="text-sm text-gray-500">{doctor?.experience} years experience</p>
              <p className="text-sm text-gray-500">{doctor?.clinicAddress}</p>
              <p className="text-blue-600 font-medium">₹{doctor?.fees}</p>
            </div>
          </div>

          {/* Second div */}
          <div className="w-full md:w-2/3">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Booking slots</h2>
            <div className="flex gap-3 items-center w-full overflow-x-auto pb-2 hide-scrollbar">
              {formattedDates?.map((timeSlot, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedDate(timeSlot)}
                  className={`text-center py-2 px-4 rounded-full cursor-pointer border transition-all duration-300 flex-shrink-0
                    ${selectedDate === timeSlot 
                      ? "bg-blue-600 text-white border-blue-600" 
                      : "border-gray-300 hover:border-blue-600"}`}
                >
                  <p>{timeSlot}</p>
                  <p>{timeSlot.date}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 w-full overflow-x-auto mt-6 pb-2 hide-scrollbar">
              {timeSlots?.map((timeSlot, idx) => (
                <p
                  key={idx}
                  onClick={() => setSelectedTime(timeSlot)}
                  className={`text-sm px-6 py-2 rounded-full cursor-pointer border transition-all duration-300 flex-shrink-0
                    ${selectedTime === timeSlot 
                      ? "bg-blue-600 text-white border-blue-600" 
                      : "border-gray-300 text-gray-600 hover:border-blue-600"}`}
                >
                  {timeSlot}
                </p>
              ))}
            </div>
            <button
              onClick={handleAppointment}
              className="w-full md:w-auto mt-8 px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300"
            >
              Book an appointment
            </button>
          </div>
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Appointment;
