/* eslint-disable react/prop-types */

const AllUsers = (props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {props.users?.length > 0 ? (
        props.users.map((user) => (
          <div  
            key={user._id}
            className="bg-gray-50 rounded-lg p-4 flex flex-col hover:shadow-lg transition-all duration-300"
          >
            <img
              src={user.profilePicture}
              alt={user.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.gender ? user.gender : "Not Selected"}</p>
            <p className="text-sm text-gray-500 mt-1">{user.email}</p>
            <button 
              onClick={() => props.deleteUser(user._id)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <div className="col-span-full flex justify-center items-center">
          <h1 className="text-xl font-semibold text-gray-600">Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default AllUsers;