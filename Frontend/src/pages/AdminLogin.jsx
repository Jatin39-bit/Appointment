import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}admin/login`, {
                email: email,
                password: password,
            });
            if (response.status === 200) {
                localStorage.setItem("token", response.data);
                navigate("/admin/home");
            }
        } catch (error) {
            console.log(error);
        }
        setEmail("");
        setPassword("");
    }

    return (
        <div className="bg-white w-full min-h-screen flex justify-center items-center p-4">
            <div className="border border-gray-300 shadow-lg w-full max-w-md rounded-lg p-6">
                <div className="flex justify-center mb-6">
                    <Logo />
                </div>
                <h1 className="text-2xl md:text-3xl mb-2 text-center font-semibold">
                    Admin Portal
                </h1>
                <p className="text-sm text-center text-gray-600 mb-6">
                    Access the administration dashboard
                </p>

                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center mt-6 text-sm text-gray-600">
                    This portal is restricted to authorized administrators only.
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
