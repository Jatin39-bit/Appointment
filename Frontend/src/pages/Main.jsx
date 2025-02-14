/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/main-css.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import generalPhysician from "../assets/general_physician.png"
import doc_image from '../assets/doc_image.png'
import short_img from '../assets/short_img.png'
import derma from "../assets/dermatologist.png"
import gyneco from '../assets/gynecologist.png'
import neuro from '../assets/neurologist.png'
import pedia from '../assets/pediatricians.png'
import sto from '../assets/stomach.png'

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
      img: generalPhysician,
    },
    {
      name: "Neurologist",
      img: neuro,
    },
    {
      name: "Dentist",
      img: generalPhysician,
    },
    {
      name: "Pediatrician",
      img: pedia,
    },
    {
      name: "Orthopedic",
      img: generalPhysician,
    },
    {
      name: "Psychiatrist",
      img: neuro,
    },
    {
      name: "Surgeon",
      img: generalPhysician,
    },
    {
      name: "Dermatologist",
      img: derma,
    },
    {
      name: "ENT Specialist",
      img: generalPhysician,
    },
    {
      name: "Gynecologist",
      img: gyneco,
    },
    {
      name:"General physician",
      img: generalPhysician
    }
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
        <div className="flex justify-center mt-10 bg-[#5F6FFF]">
          <div className="w-1/2 flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold  text-white ">Book Appointment <br />With Trusted Doctors</h1>
            <div class="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light mt-2"><img class="w-28" src={short_img} alt=""/><p>Simply browse through our extensive list of trusted doctors, <br /> schedule your appointment hassle-free.</p></div>

            <button onClick={()=>navigate('/doctor')} className="self-center py-2 px-4 bg-white rounded-xl mt-4 font-normal text-lg">Book Appointment</button>
          </div>
          <div className="w-1/2">
            <img src={doc_image} />
          </div>
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
