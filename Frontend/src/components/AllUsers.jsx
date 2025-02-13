/* eslint-disable react/prop-types */

const AllUsers = (props) => {
  return (
    <div className=" mb-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 w-full">
    {props.users?.length > 0? props.users.map((user) => (
      <div  
        key={user._id}
        className=" bg-gray-100 w-90 pb-6  items-center rounded-lg justify-center flex flex-col flex-shrink-0 cursor-pointer"
      >
        <img
          src={user.profilePicture}
          alt={user.name}
          className="rounded-lg md:w-52 md:h-64  lg:w-72  object-cover"
        />
        <h2 className="font-semibold tracking-tighter mt-2">{user.name}</h2>
        <h2 className="font-semibold tracking-tighter">{user.gender? user.gender: "Not Selected"}</h2>
        <h4 className="text-sm text-gray-500 mb-2">
          {user.email}
        </h4>
        <button className="p-2 px-4 bg-red-500 rounded-lg"
        onClick={()=>props.deleteUser(user._id)}
        >Remove</button>
      </div>
    )):(<h1>Loading</h1>)}
  </div>
  )
}

export default AllUsers