import DoctorNavbar from "../components/DoctorNavbar"
import Footer from "../components/Footer"
import { useContext, useState } from "react"
import { DoctorDataContext } from "../context/DoctorContext"
import axios from "axios"

const DoctorProfile = () => {
  const { doctor, setDoctor } = useContext(DoctorDataContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editPhone, setEditPhone] = useState(doctor?.phone);
  const [editAddress, setEditAddress] = useState(doctor?.clinicAddress);
  const [editGender, setEditGender] = useState(doctor?.gender);
  const [editBirthday, setEditBirthday] = useState(doctor?.birthday);
  const [editConsultationFee, setEditConsultationFee] = useState(doctor?.consultationFee);
  const [editAbout, setEditAbout] = useState(doctor?.about);

  const handleSave = async(e) => {
    e.preventDefault();
    const response= await axios.put(`${import.meta.env.VITE_API_URL}doctor/updateprofile`,{
      phone: editPhone,
      address: editAddress,
      gender: editGender,
      birthday: editBirthday,
      consultationFee: editConsultationFee,
      about: editAbout,
    },{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if(response.status === 200){
      response.data.birthday=response.data.birthday.split('T')[0]
      setDoctor(response.data);
      console.log(response.data);
    }
    setIsEditing(false);
  };

  return (
    <div className="px-32">
      <DoctorNavbar />
      <div>
        {/* Profile pic div */}
        <div className="">
          <div className="w-40 h-40 bg-gray-300 rounded-lg mt-10">
            <img src={doctor?.profilePicture} alt="Profile Pic" className="w-40 h-40 rounded-lg" />
          </div>
        </div>
        {/* doctor details */}
        <h1 className="mt-6 text-4xl font-semibold capitalize">{doctor?.name}</h1>
        <div className="h-[1px] w-full bg-gray-500"></div>
        {/* Contact info div */}
        {!isEditing && (
          <div>
            <div>
              <h2 className='text-md mt-2 border-b-[1px] border-solid border-black w-max'>CONTACT INFORMATION</h2>
              <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]">
                <p className="font-medium">Email id:</p>
                <p className="text-blue-500">{doctor?.email}</p>
                <p className="font-medium">Phone:</p>
                <p className="text-blue-500">{doctor?.phone}</p>
                <p className="font-medium">Address:</p>
                <p className="text-blue-500 capitalize ">{doctor?.clinicAddress}<br /> </p>
              </div>
            </div>
            {/* Basic info */}
            <div>
              <p className="text-[#797979] underline mt-3">BASIC INFORMATION</p>
              <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600">
                <p className="font-medium">Gender:</p>
                <p className="text-gray-500">{doctor?.gender ? doctor.gender : "Not selected"}</p>
                <p className="font-medium">Birthday:</p>
                <p className="text-gray-500">{doctor?.birthday ? doctor.birthday : "Not selected"}</p>
                <p className="font-medium">Experience:</p>
                <p className="text-gray-500">{doctor?.experience}</p>
                <p className="font-medium">Consultation Fee:</p>
                <p className="text-gray-500">${doctor?.consultationFee}</p>
                <p className="font-medium">About:</p>
                <p className="text-gray-500">{doctor?.about.length > 0 ? doctor.about : "Please add about section"}</p>
                <p className="font-medium">Specialization:</p>
                <p className="text-gray-500">{doctor?.specialization}</p>
              </div>
            </div>
            {/* Edit button */}
            <div className="mt-10">
              <button
                className="border border-primary px-8 py-2 rounded-full hover:bg-blue-900 hover:text-white bg-blue-600"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </div>
          </div>
        )}
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
              <label className="font-medium">Consultation Fee:</label>
              <input
                type="text"
                value={editConsultationFee}
                onChange={(e) => setEditConsultationFee(e.target.value)}
                className="border border-gray-300 rounded p-2"
              />
              <label className="font-medium">About:</label>
              <textarea
                value={editAbout}
                onChange={(e) => setEditAbout(e.target.value)}
                className="border border-gray-300 rounded p-2"
              />
            </div>
            <div className="mt-5">
              <button
                className="border border-primary px-8 py-2 rounded-full hover:bg-blue-900 hover:text-white bg-blue-600 mr-2"
                onClick={(e) => handleSave(e)}
              >
                Save
              </button>
              <button
                className="border border-primary px-8 py-2 rounded-full hover:bg-red-900 hover:text-white bg-red-600 border-none  outline-none"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DoctorProfile;