import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const AboutUs = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="px-4 sm:px-8 md:px-16 lg:px-32">
        <Navbar />
        <h1 className="text-2xl mt-8 md:mt-16 text-center font-semibold">
          About <span className="text-blue-600">MediCare+</span>
        </h1>

        {/* Main div */}
        <div className="flex flex-col md:flex-row mt-8 gap-8 md:justify-around">
          {/* Image div  */}
          <div className="w-full md:w-1/3">
            <img 
              src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?ixlib=rb-4.0.3"
              alt="Medical Professionals" 
              className="w-full h-auto rounded-lg shadow-lg" 
            />
          </div>

          {/* Text Main div */}
          <div className="w-full md:w-2/3 space-y-8">
            {/* Text div 1 */}
            <div className="w-full">
              <h1 className="text-blue-600 font-semibold text-lg">OUR MISSION</h1>
              <h3 className="text-gray-700 mt-2 leading-relaxed">
                At MediCare+, our mission is to revolutionize healthcare accessibility by connecting patients with qualified medical professionals through a seamless digital platform. We strive to make quality healthcare services available to everyone, ensuring a smooth and efficient appointment booking experience.
              </h3>
            </div>

            {/* Text div 2 */}
            <div className="w-full">
              <h1 className="font-semibold text-lg text-blue-600">OUR VISION</h1>
              <h3 className="text-gray-700 mt-2 leading-relaxed">
                We envision a future where accessing healthcare is as simple as a few clicks. MediCare+ aims to be the leading platform that bridges the gap between patients and healthcare providers, fostering a healthier community through technology-driven solutions and patient-centered care.
              </h3>
            </div>

            {/* Values section */}
            <div className="w-full">
              <h1 className="font-semibold text-lg text-blue-600">OUR VALUES</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">Patient-First Approach</h3>
                  <p className="text-sm text-gray-600 mt-1">Prioritizing patient needs and comfort in every interaction</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">Quality Care</h3>
                  <p className="text-sm text-gray-600 mt-1">Connecting you with verified and experienced healthcare professionals</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">Accessibility</h3>
                  <p className="text-sm text-gray-600 mt-1">Making healthcare services easily accessible to everyone</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">Innovation</h3>
                  <p className="text-sm text-gray-600 mt-1">Leveraging technology to improve healthcare delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why choose us */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-12">
          <div className="border px-6 py-8 flex flex-col gap-5 text-[15px] hover:bg-blue-700 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
            <b>EFFICIENCY:</b>
            <p>
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>
          <div className="border px-6 py-8 flex flex-col gap-5 text-[15px] hover:bg-blue-700 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
            <b>CONVENIENCE: </b>
            <p>
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>
          <div className="border px-6 py-8 flex flex-col gap-5 text-[15px] hover:bg-blue-700 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
            <b>PERSONALIZATION:</b>
            <p>
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};

export default AboutUs;
