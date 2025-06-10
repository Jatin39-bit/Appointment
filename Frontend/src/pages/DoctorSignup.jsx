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
    <div className="bg-white w-full min-h-screen flex justify-center items-center p-4">
      <div className="border border-gray-300 shadow-lg w-full max-w-2xl rounded-lg p-6">
        <h1 className="text-2xl md:text-3xl text-center font-semibold mb-6">
          <span className="text-blue-600">Hi Doc!</span> Create Account
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                minLength={3}
                placeholder="e.g-SAMAR SINGH"
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
                placeholder="e.g- sample@example.com"
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
                minLength={6}
                name="password"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 mb-1">
                Phone
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                id="phone"
                name="phone"
                minLength={10}
                placeholder="e.g- 1234567890"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="specialization" className="block text-gray-700 mb-1">
                Specialization
              </label>
              <select 
                name="specialization" 
                defaultChecked={specialization} 
                onChange={(e) => setSpecialization(e.target.value)} 
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Specialization</option>
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
            </div>

            <div>
              <label htmlFor="experience" className="block text-gray-700 mb-1">
                Experience (years)
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
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="clinicAddress" className="block text-gray-700 mb-1">
              Clinic Address
            </label>
            <input
              value={clinicAddress}
              onChange={(e) => setClinicAddress(e.target.value)}
              type="text"
              id="clinicAddress"
              minLength={8}
              name="clinicAddress"
              placeholder="e.g- 123, XYZ Street, ABC City"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="consultationFee" className="block text-gray-700 mb-1">
              Consultation Fee
            </label>
            <input
              value={consultationFee}
              onChange={(e) => setConsultationFee(e.target.value)}
              type="number"
              min={0}
              max={10000}
              id="consultationFee"
              name="consultationFee"
              placeholder="e.g- 500"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg mt-4 hover:bg-blue-700 transition-colors duration-300"
          >
            Create account
          </button>
        </form>
        <div className="mt-4 space-y-2 text-center">
          <h3 className="text-sm text-gray-800">Not a Doctor? <Link className="text-blue-600 hover:underline" to="/user/signup">Sign up as patient</Link></h3>
          <h3 className="text-sm text-gray-800">Already have an account? <Link className="text-blue-600 hover:underline" to="/doctor/login">Login here</Link></h3>
        </div>
      </div>
    </div>
  );
}

export default DoctorSignup