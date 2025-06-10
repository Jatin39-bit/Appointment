/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Doctor = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();     
  

  useEffect(() => {
    setFilter(props.filter ? props.filter : filter);
    async function fetchData() {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}doctor/getdoctors`, {
        params: { filter: filter },
      });
      setDoctors(res.data);
      setLoading(false);
    }
    fetchData();
  }, [filter]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
            <h1 className="text-3xl font-semibold">Loading...</h1>
            </div>
        );
        }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-4 sm:px-8 md:px-16 lg:px-32">
        <Navbar />
        <h1 className="mb-6 mt-2 text-xl md:text-2xl font-medium">Browse through the specialist Doctors.</h1>
        <div className="flex flex-col md:flex-row gap-6 mb-16">
          {/* selection for filter */}
          <div className="w-full md:w-1/5 space-y-3">
            {/* Filter buttons */}
            <p
              className={`px-4 py-2 border rounded-md cursor-pointer transition-all duration-300 ${
                filter === "gyneacologist" 
                ? "bg-blue-600 text-white" 
                : "hover:bg-blue-600 hover:text-white"
              }`}
              onClick={() => setFilter("gyneacologist")}
            >
              Gyneacologist
            </p>
            <p
              className={`px-4 py-2 border rounded-md cursor-pointer transition-all duration-300 ${
                filter === "dermatologist" 
                ? "bg-blue-600 text-white" 
                : "hover:bg-blue-600 hover:text-white"
              }`}
              onClick={() => setFilter("dermatologist")}
            >
              Dermatologist
            </p>
            <p
              className={`px-4 py-2 border rounded-md cursor-pointer transition-all duration-300 ${
                filter === "neurologist" 
                ? "bg-blue-600 text-white" 
                : "hover:bg-blue-600 hover:text-white"
              }`}
              onClick={() => setFilter("neurologist")}
            >
              Neurologist
            </p>
            <p
              className={`px-4 py-2 border rounded-md cursor-pointer transition-all duration-300 ${
                filter === "pediatrician" 
                ? "bg-blue-600 text-white" 
                : "hover:bg-blue-600 hover:text-white"
              }`}
              onClick={() => setFilter("pediatrician")}
            >
              Pediatrician
            </p>
            <p
              className={`px-4 py-2 border rounded-md cursor-pointer transition-all duration-300 ${
                filter === "general physician" 
                ? "bg-blue-600 text-white" 
                : "hover:bg-blue-600 hover:text-white"
              }`}
              onClick={() => setFilter("general physician")}
            >
              General Physician
            </p>
          </div>

          {/* Doctors grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                onClick={() => navigate(`/appointment/${doctor._id}`)}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <img
                  src={doctor.profilePicture}
                  alt={doctor.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="font-semibold text-lg">{doctor.name}</h2>
                <p className="text-gray-600">{doctor.specialization}</p>
                <p className="text-sm text-gray-500 mt-2">{doctor.clinicAddress}</p>
                <p className="text-sm text-gray-500">{doctor.experience} years experience</p>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-blue-600 font-medium">₹{doctor.fees}</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Doctor;
