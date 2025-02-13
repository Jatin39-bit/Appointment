import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';


const DoctorNavbar = () => {
    const navigate  = useNavigate()
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
    <div className="pt-4 pb-4 flex justify-between  items-center border-b-[2px] border-gray-300 border-solid">
        <Link to="/doctor/home" className="text-4xl font-semibold">Logo</Link>
        <div className="flex gap-4 items-center">
            <Link to="/doctor/my-profile">
              MY PROFILE
            </Link>
            <Link to="/doctor/home">
              APPOINTMENTS
            </Link>
        </div>
        <button onClick={()=>logout()} className='bg-gray-500 rounded-lg p-2'>LOGOUT
        </button>
    </div>
  )
}

export default DoctorNavbar     