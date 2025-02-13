import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const ContactUs = () => {
  return (
    <div className="flex flex-col min-h-screen px-32">
        <Navbar/>
        <h1 className="text-2xl mt-16 text-gray-600 text-center font-semibold">
        CONTACT <span className="text-blue-900">US</span>
      </h1>
              {/* Main div */}
      <div className="flex mt-10 justify-around flex-grow flex-shrink basis-auto">
        {/* Image div  */}
        <div className="w-1/3 pl-4">
          <img src="https://picsum.photos/500/290" alt="Wrong URL" />
        </div>

        {/* Text Main div */}
        <div className="w-2/3 pl-12 mb-12">
          {/* Text div 1 */}
          <div className="w-full">
            <h1 className="text-blue-950 font-medium">OUR OFFICE</h1>
            <h3 className="text-sm  text-gray-500 w-[70%]">
              000 Willms Station suite 0000,Washington,USA
              <br /><br />
              Tel:(000) 000-0000
            </h3>
          </div>

          {/* Text div 2 */}
          <div className="w-full mt-12">
            <h1 className="font-medium text-blue-950">CAREERS AT NAME</h1>
            <h3 className="text-sm text-gray-500 w-[70%] ">
                Learn more about our teams and job openings.
            </h3>
          </div>

          <button className="px-4 py-2 text-xl border-[1px] rounded-md mt-6 border-black border-solid">Explore Jobs</button>
        </div>
      </div>
        <Footer/>
    </div>
  )
}

export default ContactUs