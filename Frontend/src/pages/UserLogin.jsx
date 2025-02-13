/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}user/login`,
        {
          email: email,
          password: password,
        }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data);
        navigate("/user/home");
      }
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="bg-white w-full h-full flex justify-center relative">
      <div className="border-1 border-solid border-gray-500 shadow-lg w-[30%] sm:w-[50%]  absolute top-[20%]  rounded-lg p-6">
        <h1 className="text-3xl mb-2 text-center pt-5 font-semibold">
          Login
        </h1>

        <h2 className="text-sm px-4 text-gray-500">Please login to book appointment</h2>
        <form className="flex flex-col p-4" onSubmit={handleSubmit}>

          <label htmlFor="email" className="font-thin mt-3">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            placeholder="e.g- sample@example.com"
            className="border-[1px] border-solid border-gray p-1 rounded-sm font-extralight text-md"
          />

          <label htmlFor="password" className="font-thin mt-5">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            className="border-[1px] border-solid border-gray text-md p-1 rounded-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg mt-6 mb-4"
          >
            Login
          </button>
        </form>
        <h3 className="text-sm text-gray-800">Don't have an Account? <Link className="text-blue-600 underline-offset-2 underline" to="/user/signup">Click here!</Link></h3>
        <h3 className="text-sm text-gray-800 mt-1">For Doctor's login <Link className="text-blue-600 underline-offset-2 underline" to="/doctor/login">Click here!</Link></h3>
      </div>
    </div>
  );
}

export default UserLogin