import Logo from './Logo';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-around p-5 gap-8">
          <div className="w-full md:w-1/3">
            <Logo className="mb-4" />
            <p className="text-sm text-gray-600">
              MediCare+ is your trusted healthcare companion, connecting patients with qualified medical professionals. 
              Our platform makes healthcare accessible, efficient, and patient-centered.
            </p>
          </div>
          <div className="w-full md:w-1/3 flex flex-col items-center"> 
            <h1 className="text-xl font-semibold mb-3">Quick Links</h1>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
              <li><Link to="/doctor" className="hover:text-blue-600">Find Doctors</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600">Contact Us</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <h1 className="text-xl font-semibold mb-3">Contact Info</h1>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>contact@medicare-plus.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center py-3 text-sm text-gray-600 border-t border-gray-200">
          Copyright © {new Date().getFullYear()} MediCare+ - All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;