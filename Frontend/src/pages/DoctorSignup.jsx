import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


const DoctorSignup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [consultationFee, setConsultationFee] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}doctor/register`,
        {
          name: name,
          email: email,
          password: password,
          phone: phone,
          specialization: specialization,
          experience: experience,
          clinicAddress: clinicAddress,
          consultationFee: consultationFee
        }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data);
        navigate("/doctor/home");
      }
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
    setName("");
    setPhone("");
    setSpecialization("");
    setExperience("");
    setClinicAddress("");
    setConsultationFee("");
  };

  return (
    <div className="bg-white w-full h-full flex justify-center relative">
      <div className="border-1 border-solid border-gray-500 shadow-lg w-[30%] sm:w-[50%]  absolute top-[2%]  rounded-lg p-6 pt-1">
        <h1 className="text-3xl text-center font-semibold">
          <span className="text-blue-600">Hi Doc!</span>  Create Account
        </h1>

        <form className="flex flex-col p-4" onSubmit={handleSubmit}>
          <label htmlFor="name" className="font-thin mt-3">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            name="name"
            placeholder="e.g-SAMAR SINGH"
            className="border-[1px]  border-solid border-gray rounded-sm font-extralight text-md"
          />

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
            className="border-[1px] border-solid border-gray rounded-sm font-extralight text-md"
          />

          <label htmlFor="password" className="font-thin mt-3">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            className="border-[1px] border-solid border-gray text-md rounded-sm"
          />

          <label htmlFor="phone" className="font-thin mt-3">
            Phone
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            id="phone"
            name="phone"
            placeholder="e.g- 1234567890"
            className="border-[1px] border-solid border-gray text-md rounded-sm"
          />

          <label htmlFor="specialization" className="font-thin mt-3">
            Specialization
          </label>
          <select name="specialization" defaultChecked={specialization} onChange={(e) => setSpecialization(e.target.value)} className="border-[1px] border-solid border-gray text-md rounded-sm">
            <option value="Orthopedic">Orthopedic</option>
            <option value="ENT Specialist">ENT Specialist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Psychiatrist">Psychiatrist</option>
            <option value="Surgeon">Surgeon</option>
            <option value="Dentist">Dentist</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Gynecologist">Gynecologist</option>
          </select>

          <label htmlFor="experience" className="font-thin mt-3">
            Experience
          </label>
          <input
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            type="number"
            min={0}
            max={40}
            id="experience"
            name="experience"
            placeholder="e.g- 5 years"
            className="border-[1px] border-solid border-gray text-md rounded-sm"
          />

          <label htmlFor="clinicAddress" className="font-thin mt-3">
            Clinic Address  
          </label>
          <input
            value={clinicAddress}
            onChange={(e) => setClinicAddress(e.target.value)}
            type="text"
            id="clinicAddress"
            name="clinicAddress"
            aria-errormessage="Please enter a valid address"
            placeholder="e.g- 123, XYZ Street, ABC City"
            className="border-[1px] border-solid border-gray text-md rounded-sm"
          />

          <label htmlFor="consultationFee" className="font-thin mt-3">
            Consultation Fee
          </label>
          <input
            value={consultationFee}
            onChange={(e) => setConsultationFee(e.target.value)}
            type="number"
            min={0}
            aria-errormessage="Please enter a valid number"
            max={10000}
            id="consultationFee"
            name="consultationFee"
            placeholder="e.g- 500"
            className="border-[1px] border-solid border-gray text-md rounded-sm"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg mt-6 mb-4"
          >
            Create account
          </button>
        </form>
        <h3 className="text-sm text-gray-800">Not a Doctor? <Link className="text-blue-600 underline-offset-2 underline" to="/user/login">Login as patient</Link></h3>
        <h3 className="text-sm text-gray-800">Already have an account? <Link className="text-blue-600 underline-offset-2 underline" to="/doctor/login">Login here</Link></h3>
      </div>
    </div>
  );
}

export default DoctorSignup