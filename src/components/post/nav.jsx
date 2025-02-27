import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex z-60 items-center justify-between p-4 bg-white border-b border-gray-100 shadow-xs sticky top-0 z-10">
      <div className="flex items-center">
        <button
          onClick={() => { navigate('/') }}
          className="mr-3 text-gray-700 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-full p-1"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="p-1 overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
            <img
              src="/mart.png"
              alt="Smart Mart Logo"
              className="h-7 w-7 object-contain transform group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
              Smart Mart
            </span>
            <span className="text-xs text-gray-500 -mt-1 group-hover:text-gray-700 transition-colors">
              Your Shopping Companion
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
