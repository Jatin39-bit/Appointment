const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-48">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <h2 className="text-xl font-semibold text-gray-600">Loading...</h2>
    </div>
  );
};

export default LoadingSpinner; 