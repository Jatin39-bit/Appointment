/* eslint-disable react/prop-types */


const AllDoctors = (props) => {
  return (
    <div className=" mb-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 p-4 w-full">
          {props.doctors?.length > 0? props.doctors.map((doctor) => (
            <div  
              key={doctor._id}
              className=" bg-gray-100 w-90 items-center rounded-lg justify-center flex flex-col flex-shrink-0 cursor-pointer pb-4"
            >
              <img
                src={doctor.img}
                alt={doctor.name}
                className="rounded-lg md:w-52 md:h-52  lg:w-72  object-cover"
              />
              <h3 className="text-green-600 mt-1 ">Available</h3>
              <h2 className="font-semibold tracking-tighter">{doctor.name}</h2>
              <h4 className="text-sm text-gray-500 mb-4">
                {doctor.specialization}
              </h4>
              <button className="p-2 px-4 bg-red-500 rounded-lg"
        onClick={()=>props.deleteDoctor(doctor._id)}
        >Remove</button>
            </div>
          )):(<h1>Loading</h1>)}
        </div>
  )
}

export default AllDoctors