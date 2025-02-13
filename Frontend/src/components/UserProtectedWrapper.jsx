/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserProtectedWrapper = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const {user, setUser} = useContext(UserDataContext);

  useEffect(() => {
    async function getProfile() {
    if (!token) {
      navigate("/user/login");
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200 || !response) {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/user/login");
      }
      response.data.birthday=response.data.birthday?.split('T')[0]
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/user/login");
    }
    }
    getProfile();
  }, [token]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
