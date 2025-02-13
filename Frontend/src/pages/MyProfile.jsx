import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {useContext} from 'react'
import {UserDataContext} from '../context/UserContext'
import { useState } from "react"
import axios from 'axios'


const   MyProfile = () => {
    const {user, setUser} = useContext(UserDataContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editPhone, setEditPhone] = useState(user?.phone);
    const [editAddress, setEditAddress] = useState(user?.address);
    const [editGender, setEditGender] = useState(user?.gender);
    const [editBirthday, setEditBirthday] = useState(user?.birthday);


    const handleSave = async(e) => {
        e.preventDefault();
        try{
            const response= await axios.put(`${import.meta.env.VITE_API_URL}user/updateprofile`,{
                phone: editPhone,
                address: editAddress,
                gender:editGender,
                birthday:editBirthday
            },{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if(response.status === 200){
                response.data.user.birthday=response.data.user.birthday.split('T')[0]
                setUser(response.data.user);
            }
        }catch(err){
            console.log(err)
        }
        setIsEditing(false);
    }

return (
    <div className="px-32">
        <Navbar/>
        <div>
            {/* Profile pic div */}
            <div className="">
                <div className="w-40 h-40 bg-gray-300 rounded-lg mt-10">
                    <img src="" alt="Profile Pic" className="w-40 h-40 rounded-lg"/>
                </div>
            </div>
            {/* User details */}
            <h1 className="mt-6 text-4xl font-semibold">{user?.name}</h1>
            <div className="h-[1px] w-full bg-gray-500"></div>
            {/* Contact info div */}
                        {!isEditing && 
                        (<div>
                        <div>
                            <h2 className='text-md mt-2 border-b-[1px] border-solid border-black w-max'>CONTACT INFORMATION</h2>
                            <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]">
                                <p className="font-medium">Email id:</p>
                                <p className="text-blue-500">{user?.email}</p>
                                <p className="font-medium">Phone:</p>
                                <p className="text-blue-500">{user?.phone}</p>
                                <p className="font-medium">Address:</p>
                                <p className="text-gray-500">{user?.address}<br/> </p>
                            </div>
                        </div>


                        <div>
                            <p className="text-[#797979] underline mt-3">BASIC INFORMATION</p>
                            <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600">
                                <p className="font-medium">Gender:</p>
                                <p className="text-gray-500">{user?.gender ? user.gender : "Not selected"}</p>
                                <p className="font-medium">Birthday:</p>
                                <p className="text-gray-500">{user?.birthday ? user.birthday : "Not selected"}</p>
                            </div>
                        </div>


                        <div className="mt-10">
                            <button 
                                className="border border-primary px-8 py-2 rounded-full hover:bg-blue-900 hover:text-white bg-blue-600" 
                                onClick={() => setIsEditing(true)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>)}

                        {isEditing && (
                            <div className="mt-10">
                                <h2 className='text-md mt-2 border-b-[1px] border-solid border-black w-max'>EDIT INFORMATION</h2>
                                <div className="grid grid-cols-1 gap-y-2.5 mt-3 text-[#363636]">
                                    <label className="font-medium">Phone:</label>
                                    <input 
                                        type="text" 
                                        value={editPhone} 
                                        onChange={(e) => setEditPhone(e.target.value)} 
                                        className="border border-gray-300 rounded p-2"
                                    />
                                    <label className="font-medium">Address:</label>
                                    <input 
                                        type="text" 
                                        value={editAddress} 
                                        onChange={(e) => setEditAddress(e.target.value)} 
                                        className="border border-gray-300 rounded p-2"
                                    />
                                    <label className="font-medium">Gender:</label>
                                    <input 
                                        type="text" 
                                        value={editGender} 
                                        onChange={(e) => setEditGender(e.target.value)} 
                                        className="border border-gray-300 rounded p-2"
                                    />
                                    <label className="font-medium">Birthday:</label>
                                    <input 
                                        type="date" 
                                        value={editBirthday} 
                                        onChange={(e) => setEditBirthday(e.target.value)} 
                                        className="border border-gray-300 rounded p-2"
                                    />
                                </div>
                                <div className="mt-5">
                                    <button 
                                        className="border border-primary px-8 py-2 rounded-full hover:bg-blue-900 hover:text-white bg-blue-600 mr-2" 
                                        onClick={(e)=>handleSave(e)}
                                    >
                                        Save
                                    </button>
                                    <button 
                                        className="border border-primary px-8 py-2 rounded-full hover:bg-red-900 hover:text-white bg-red-600" 
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
        <Footer/>
    </div>
</div>
  )
}

export default MyProfile