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
        console.log(res.data);
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


  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-4 sm:px-8 md:px-16 lg:px-32">
        <Navbar />

        {/* Hero section */}
        <div className="mt-6 md:mt-12">
          <h1 className="text-2xl md:text-3xl font-semibold text-center">
            Welcome to <span className="text-blue-600">MediCare+</span>
          </h1>
          <div className="flex flex-col md:flex-row items-center mt-10 bg-[#2563EB] rounded-xl overflow-hidden">
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-12">
              <h1 className="text-3xl md:text-5xl font-bold text-white text-center md:text-left">
                Your Healthcare <br />Companion
              </h1>
              <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light mt-4">
                <img className="w-20 md:w-28" src={short_img} alt=""/>
                <p className="text-center md:text-left">
                  Connect with trusted healthcare professionals <br className="hidden md:block" /> 
                  and schedule appointments hassle-free.
                </p>
              </div>
              <button 
                onClick={() => navigate('/doctor')} 
                className="mt-6 py-2 px-6 bg-white rounded-xl font-normal text-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Book Appointment
              </button>
            </div>
            <div className="w-full md:w-1/2">
              <img src={doc_image} className="w-full h-full object-cover" alt="Doctor" />
            </div>
          </div>
        </div>

        {/* Specialties section */}
        <div className="mt-12 md:mt-20">
          <h1 className="text-2xl font-semibold text-center">
            Find Doctors by Speciality
          </h1>
          <h3 className="text-sm text-gray-700 text-center mt-2">
            Simply browse through our extensive list of trusted doctors, schedule
            your appointment hassle-free
          </h3>

          {/* Speciality cards */}
          <div className="flex hide-scrollbar overflow-x-auto gap-4 mt-6 p-4">
            {specialities.map((speciality, idx) => (
              <div
                key={idx}
                onClick={() => {
                  props.setFilter(speciality.name);
                  navigate('/doctor');
                }}
                className="flex flex-col items-center justify-center bg-gray-100 w-32 md:w-40 h-32 md:h-40 rounded-lg flex-shrink-0 hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
              >
                <img
                  src={speciality.img}
                  alt={speciality.name}
                  className="w-16 md:w-24 h-16 md:h-24 rounded-full"
                />
                <h3 className="font-medium text-sm md:text-base mt-2 text-center px-2">
                  {speciality.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Top doctors section */}
        <div className="mt-12 md:mt-20 mb-12">
          <h1 className="text-2xl font-semibold text-center">
            Top Doctors to Book
          </h1>
          <h3 className="text-sm text-gray-700 text-center mt-2">
            Simply browse through our extensive list of trusted doctors.
          </h3>

          {/* Doctor cards */}
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <h1 className="text-xl font-semibold text-gray-600">Loading...</h1>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {doctors.map((doctor) => (
                <div  
                  key={doctor._id}
                  onClick={() => navigate(`/appointment/${doctor._id}`)}
                  className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="aspect-w-4 aspect-h-3">
                    <img
                      src={doctor.img}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-green-600 text-sm">Available</span>
                    </div>
                    <h2 className="font-semibold mt-2">{doctor.name}</h2>
                    <p className="text-sm text-gray-500">{doctor.specialization}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
