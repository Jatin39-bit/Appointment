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
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Edit Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Phone:</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Gender:</label>
                <select
                  value={editGender}
                  onChange={(e) => setEditGender(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Birthday:</label>
                <input
                  type="date"
                  value={editBirthday}
                  onChange={(e) => setEditBirthday(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Consultation Fee:</label>
                <input
                  type="number"
                  value={editConsultationFee}
                  onChange={(e) => setEditConsultationFee(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Address:</label>
                <textarea
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300"
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