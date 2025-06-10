import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const ContactUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-4 sm:px-8 md:px-16 lg:px-32">
        <Navbar/>
        <h1 className="text-2xl mt-8 md:mt-16 text-center font-semibold">
          Contact <span className="text-blue-600">MediCare+</span>
        </h1>
        
        {/* Main div */}
        <div className="flex flex-col md:flex-row mt-8 gap-8 md:justify-around">
          {/* Image div  */}
          <div className="w-full md:w-1/3">
            <img 
              src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3" 
              alt="Contact Us" 
              className="w-full h-auto rounded-lg shadow-lg" 
            />
          </div>

          {/* Text Main div */}
          <div className="w-full md:w-2/3 space-y-8 mb-12">
            {/* Contact Information */}
            <div className="w-full">
              <h1 className="text-blue-600 font-semibold text-lg">GET IN TOUCH</h1>
              <div className="space-y-4 mt-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h3 className="font-medium">Office Location</h3>
                    <p className="text-gray-600 mt-1">
                      MediCare+ Healthcare Center<br />
                      123 Medical Plaza, Suite 100<br />
                      Washington, DC 20001, USA
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <h3 className="font-medium">Phone Numbers</h3>
                    <p className="text-gray-600 mt-1">
                      General Inquiries: +1 (555) 123-4567<br />
                      Support: +1 (555) 987-6543
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3 className="font-medium">Email Addresses</h3>
                    <p className="text-gray-600 mt-1">
                      General Inquiries: contact@medicare-plus.com<br />
                      Support: support@medicare-plus.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="w-full">
              <h1 className="text-blue-600 font-semibold text-lg">WORKING HOURS</h1>
              <div className="mt-4 space-y-2 text-gray-600">
                <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p>Saturday: 9:00 AM - 5:00 PM</p>
                <p>Sunday: Closed</p>
                <p className="text-sm mt-4">* Emergency support available 24/7</p>
              </div>
            </div>

            {/* Careers Section */}
            <div className="w-full pt-4">
              <h1 className="text-blue-600 font-semibold text-lg">JOIN OUR TEAM</h1>
              <p className="text-gray-600 mt-2">
                We're always looking for talented individuals to join the MediCare+ family. 
                Explore our current openings and be part of our mission to transform healthcare.
              </p>
              <button className="mt-4 px-6 py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
                View Career Opportunities
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  )
}

export default ContactUs