import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}user/register`,
        {
          name: name,
          email: email,
          password: password,
        }
      );
      if (response.status === 201) {
        localStorage.setItem("token", response.data);
        alert('User registered successfully');
        navigate("/user/home");
      }
    } catch (error) {
      console.log(error);
    }
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="bg-white w-full min-h-screen flex justify-center items-center p-4">
      <div className="border border-gray-300 shadow-lg w-full max-w-md rounded-lg p-6">
        <h1 className="text-2xl md:text-3xl mb-2 text-center pt-5 font-semibold">
          Create Account
        </h1>

        <h2 className="text-sm px-4 text-gray-500 text-center">Please sign up to book appointments</h2>
        <form className="flex flex-col p-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-1">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                name="name"
                placeholder="e.g- John Doe"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                placeholder="e.g- john@example.com"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                minLength={6}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Minimum 6 characters"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg mt-6 mb-4 hover:bg-blue-700 transition-colors duration-300"
          >
            Create Account
          </button>
        </form>
        <div className="text-center space-y-2">
          <h3 className="text-sm text-gray-800">Already have an account? <Link className="text-blue-600 hover:underline" to="/user/login">Login here</Link></h3>
          <h3 className="text-sm text-gray-800">Are you a doctor? <Link className="text-blue-600 hover:underline" to="/doctor/signup">Sign up as doctor</Link></h3>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
