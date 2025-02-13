/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DoctorDataContext } from "../context/DoctorContext";

const DoctorProtectedWrapper = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const {doctor,setDoctor} = useContext(DoctorDataContext);

  useEffect( () => {
    async function getProfile() {
    if (!token) {
      navigate("/doctor/login");
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}doctor/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
if(response.status===200){
  response.data.birthday=response.data.birthday.split('T')[0]
      setDoctor(response.data);
      setLoading(false);
}else{
  localStorage.removeItem("token");
  setToken(null);
  navigate("/doctor/login");
}
    } catch (error) {
      console.log(error);
      navigate("/doctor/login");
    }
  }
  getProfile();
  }, [token]);


  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
};

export default DoctorProtectedWrapper;
