import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import Logo from './Logo';

const DoctorNavbar = () => {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const logout = async() => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}doctor/logout`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.status === 200) {
                localStorage.removeItem('token')
                navigate('/doctor/login')
            }
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <nav className="py-4 border-b border-gray-300">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center w-full">
                    <Logo />
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
                
                <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center gap-4 w-full md:w-auto mt-4 md:mt-0`}>
                    <Link 
                        to="/doctor/my-profile"
                        className="w-full md:w-auto text-center py-2 px-4 hover:text-blue-600 transition-colors duration-300"
                    >
                        MY PROFILE
                    </Link>
                    <Link 
                        to="/doctor/home"
                        className="w-full md:w-auto text-center py-2 px-4 hover:text-blue-600 transition-colors duration-300"
                    >
                        APPOINTMENTS
                    </Link>
                    <button 
                        onClick={logout}
                        className="w-full md:w-auto px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
                    >
                        LOGOUT
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default DoctorNavbar     