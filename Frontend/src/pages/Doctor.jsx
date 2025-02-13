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
      }
      );
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
    <div className="px-32">
      <Navbar />
      <h1 className="mb-6 mt-2">Browse through the specialist Doctors.</h1>
      <div className="mb-16 flex gap-6 ">
        {/* selection for filter */}
        <div className="w-1/5 text-gray hover:text-black active:text-black">
          {/* gyneacologist */}
          <p
            className="px-4 py-2 border-[1px] border-gray border-solid rounded-md mt-2 mb-3 cursor-pointer hover:bg-blue-600"
            onClick={() => setFilter("gyneacologist")}  
            style={{backgroundColor: filter === "gyneacologist" ? "#2563eb" : "white"}}
          >
            gyneacologist
          </p>

          {/* Cardiologist */}
          <p
            className="px-4 py-2 border-[1px] border-gray border-solid rounded-md mt-2 mb-3 cursor-pointer hover:bg-blue-600"
            onClick={() => setFilter("cardiologist")}
            style={{backgroundColor: filter === "cardiologist" ? "#2563eb" : "white"}}

          >
            Cardiologist
          </p>
          {/* Dentist */}
          <p
            className="px-4 py-2 border-[1px] border-gray border-solid rounded-md mt-2 mb-3 cursor-pointer hover:bg-blue-600"
            onClick={() => setFilter("dentist")}
            style={{backgroundColor: filter === "dentist" ? "#2563eb" : "white"}}
          >
            Dentist
          </p>
          {/* Dermatologist */}
          <p
            className="px-4 py-2 border-[1px] border-gray border-solid rounded-md mt-2 mb-3 cursor-pointer hover:bg-blue-600"
            onClick={() => setFilter("dermatologist")}
            style={{backgroundColor: filter === "dermatologist" ? "#2563eb" : "white"}}
          >
            Dermatologist
          </p>
          {/* ENT */}
          <p
            className="px-4 py-2 border-[1px] border-gray border-solid rounded-md mt-2 mb-3 cursor-pointer hover:bg-blue-600"
            onClick={() => setFilter("ENT specialist")}
            style={{backgroundColor: filter === "ENT specialist" ? "#2563eb" : "white"}}
          >
            ENT Specialist
          </p>
          {/* General Physician */}
          <p
            className="px-4 py-2 border-[1px] border-gray border-solid rounded-md mt-2 mb-3 cursor-pointer hover:bg-blue-600"
            onClick={() => setFilter("general physician")}
            style={{backgroundColor: filter === "general physician" ? "#2563eb" : "white"}}
          >
            General Physician
          </p>
          {/* Neurologist */}
          <p
            className="px-4 py-2 border-[1px] border-gray border-solid rounded-md mt-2 mb-3 cursor-pointer hover:bg-blue-600"
            onClick={() => setFilter("neurologist")}
            style={{backgroundColor: filter === "neurologist" ? "#2563eb" : " white"}}
          >
            Neurologist
          </p>
          {/* Orthopedic */}
          <p
            className="px-4 py-2 border-[1px] border-gray border-solid rounded-md mt-2 mb-3 cursor-pointer hover:bg-blue-600"
            onClick={() => setFilter("orthopedic")}
            style={{backgroundColor: filter === "orthopedic" ? "#2563eb" : "white "}}
          >
            Orthopedic
          </p>
        </div>

        {/* Doctors */}
        <div className=" mb-8 grid xl:grid-cols-3 lg:grid-cols-2 gap-8 md:grid-cols-2 sm:grid-cols-1 px-4 py-2 w-4/5 ">
          {doctors.map((doctor, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/appointment/${doctor._id}`)}
              className=" bg-gray-100 w-80 h-80 items-center rounded-lg justify-center flex flex-col flex-shrink-0 cursor-pointer"
            >
              <img
                src={doctor.img}
                alt={doctor.name}
                className="rounded-lg md:w-52 md:h-64  lg:w-72  object-cover"
              />
              <h3 className="text-green-600 mt-1 ">Available</h3>
              <h2 className="font-semibold tracking-tighter">{doctor.name}</h2>
              <h4 className="text-sm text-gray-500 mb-4">
                {doctor.speciality}
              </h4>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Doctor;
