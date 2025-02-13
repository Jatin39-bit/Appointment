import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const AboutUs = () => {
  return (
    <div className="w-full h-full px-32 ">
      <Navbar />
      <h1 className="text-2xl mt-16 text-gray-600 text-center font-semibold">
        ABOUT <span className="text-blue-900">US</span>
      </h1>

      {/* Main div */}
      <div className="flex mt-8 justify-around">
        {/* Image div  */}
        <div className="w-1/3 pl-2">
          <img src="https://picsum.photos/500/270" alt="Wrong URL" />
        </div>

        {/* Text Main div */}
        <div className="w-2/3 pl-12">
          {/* Text div 1 */}
          <div className="w-full">
            <h1 className="text-blue-950 font-medium">OUR MISSION</h1>
            <h3 className="text-sm  text-gray-500 w-[70%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              recusandae porro deserunt voluptatibus aliquid nostrum ipsa dolor,
              error ducimus voluptas, enim vel! Totam rerum qui excepturi a
              repellat debitis labore.
            </h3>
          </div>

          {/* Text div 2 */}
          <div className="w-full mt-12">
            <h1 className="font-medium text-blue-950">OUR VISION</h1>
            <h3 className="text-sm text-gray-500 w-[70%] ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              recusandae porro deserunt voluptatibus aliquid nostrum ipsa dolor,
              error ducimus voluptas, enim vel! Totam rerum qui excepturi a
              repellat debitis labore.
            </h3>
          </div>
        </div>
      </div>

        {/* Why choose us */}
      <h1 className="text-2xl text-gray-600 font-semibold ml-12 mb-8 mt-6">Why <span className="text-blue-950">choose us</span></h1>
      <div className="flex flex-col md:flex-row mb-20">
          <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-700 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
            <b>EFFICIENCY:</b>
            <p>
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-700 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
            <b>CONVENIENCE: </b>
            <p>
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-700 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
            <b>PERSONALIZATION:</b>
            <p>
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
