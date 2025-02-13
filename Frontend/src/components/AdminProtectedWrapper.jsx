/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext} from "react";
import axios from "axios";
import {AdminDataContext} from "../context/AdminContext";

const AdminProtectedWrapper = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const {admin, setAdmin} = useContext(AdminDataContext);

  useEffect( () => {
    async function getProfile() {
    if (!token) {
      navigate("/admin/login");
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}admin/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200) {
        localStorage.removeItem("token");
        navigate("/admin/login");
      } else {
        setAdmin(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      navigate("/admin/login");
    }
    }
    getProfile();
  }, [token]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
};

export default AdminProtectedWrapper;
