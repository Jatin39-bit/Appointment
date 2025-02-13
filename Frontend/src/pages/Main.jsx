/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/main-css.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Main = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const getDoctors = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}doctor/getdoctors`,
          {params: {filter: 'all'}}
        );
        setDoctors(res.data);
        setLoading(false);
  
      } catch (error) {
        console.error(error);
      }
    };
    getDoctors();
  }, []);

  const specialities = [
    {
      name: "Cardiologist",
      img: "http://picsum.photos/200/200",
    },
    {
      name: "Dentist",
      img: "http://picsum.photos/200/200",
    },
    {
      name: "ENT Specialist",
      img: "http://picsum.photos/200/200",
    },
    {
      name: "Neurologist",
      img: "http://picsum.photos/200/200",
    },
    {
      name: "Orthopedic",
      img: "http://picsum.photos/200/200",
    },
    {
      name: "Pediatrician",
      img: "http://picsum.photos/200/200",
    },
    {
      name: "Psychiatrist",
      img: "http://picsum.photos/200/200",
    },
    {
      name: "Surgeon",
      img: "http://picsum.photos/200/200",
    },
    {
      name: "Dermatologist",
      img: "http://picsum.photos/200/200",
    },
    {
      name: "Gynecologist",
      img: "http://picsum.photos/200/200",
    },
  ];

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="w-full h-full px-32">
      <Navbar />

      {/* Book appointment with img */}
      <div>
        <h1 className="text-3xl font-semibold text-center mt-6">
          Welcome to the world of HealthCare
        </h1>
        <div className="flex justify-center mt-10">
          <img
            src="http://picsum.photos/600/200"
            alt="main"
            className="w-full h-[40%]"
          />
        </div>
      </div>

      {/* Find by speciality */}
      <div>
        <h1 className="text-2xl font-semibold text-center mt-6">
          Find Doctors by Speciality
        </h1>
        <h3 className="text-sm text-gray-700 text-center">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free
        </h3>

        {/* Speciality cards */}
        <div className="flex hide-scrollbar overflow-auto gap-4 mt-6 p-4 w-full">
          {specialities.map((speciality, idx) => (
            <div
              key={idx}
              className="flex bg-gray-300 w-40 h-40 flex-col items-center rounded-lg justify-center flex-shrink-0 hover:mt-0"
            >
              <img
                src={speciality.img}
                alt={speciality.name}
                onClick={()=>{props.setFilter(speciality.name)
                  navigate('/doctor')
                }}
                className="w-24 h-24 rounded-full"
              />
              <h3 className="font-semibold mt-2 tracking-tighter">
                {speciality.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Top doctors to book */}
      <div>
        <h1 className="text-2xl font-semibold text-center mt-6">
          Top Doctors to Book
        </h1>
        <h3 className="text-sm text-gray-700 text-center">
          Simply browse through our extensive list of trusted doctors.
        </h3>

        {/* Doctor cards */}
        <div className=" mb-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 p-4 w-full">
          {doctors.map((doctor) => (
            <div  
              key={doctor._id}
              onClick={() => navigate(`/appointment/${doctor._id}`)}
              className=" bg-gray-100 w-90 h-80 items-center rounded-lg justify-center flex flex-col flex-shrink-0 cursor-pointer"
            >
              <img
                src={doctor.img}
                alt={doctor.name}
                className="rounded-lg md:w-52 md:h-64  lg:w-72  object-cover"
              />
              <h3 className="text-green-600 mt-1 ">Available</h3>
              <h2 className="font-semibold tracking-tighter">{doctor.name}</h2>
              <h4 className="text-sm text-gray-500 mb-4">
                {doctor.specialization}
              </h4>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
