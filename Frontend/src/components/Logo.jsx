import { Link } from 'react-router-dom';

const Logo = ({ className = "" }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center">
        <svg 
          className="w-8 h-8 md:w-10 md:h-10" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12.5 2C7.25329 2 3 6.25329 3 11.5C3 16.7467 7.25329 21 12.5 21C17.7467 21 22 16.7467 22 11.5C22 6.25329 17.7467 2 12.5 2Z" 
            className="fill-blue-600"
          />
          <path 
            d="M12.5 7V16M8 11.5H17" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </svg>
        <span className="text-xl md:text-2xl font-bold ml-2">
          <span className="text-blue-600">Medi</span>
          <span className="text-gray-800">Care</span>
          <span className="text-blue-600">+</span>
        </span>
      </div>
    </Link>
  );
};

export default Logo; 