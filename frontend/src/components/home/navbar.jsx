import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Search, ChevronDown, MapPin, 
  Truck, Car, Bike, CarFront, ShoppingBag, 
  Laptop, Building2, Sofa, Camera, Shirt,
  GraduationCap, Briefcase, Globe
} from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Australia');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicking outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    
    // Check if screen size is mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', checkIfMobile);
    
    // Initial check
    checkIfMobile();
    
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const australianStates = [
    { name: 'Australia', icon: <Globe className="h-4 w-4" /> },
    { name: 'New South Wales', icon: <MapPin className="h-4 w-4" /> },
    { name: 'Victoria', icon: <MapPin className="h-4 w-4" /> },
    { name: 'Queensland', icon: <MapPin className="h-4 w-4" /> },
    { name: 'Western Australia', icon: <MapPin className="h-4 w-4" /> },
    { name: 'South Australia', icon: <MapPin className="h-4 w-4" /> },
    { name: 'Tasmania', icon: <MapPin className="h-4 w-4" /> },
    { name: 'Northern Territory', icon: <MapPin className="h-4 w-4" /> },
    { name: 'Australian Capital Territory', icon: <MapPin className="h-4 w-4" /> }
  ];

  const categories = {
    'Vehicles': {
      icon: <Car className="h-5 w-5" />,
      items: [
        { name: 'Cars' },
        { name: 'SUVs'},
        { name: 'Commercial'}
      ]
    },

  };

  return (
    <>
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm fixed top-0 z-50">
        {/* Main Navbar Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="p-1.5 overflow-hidden rounded-xl">
                <img
                  src="/mart.png"
                  alt="Smart Mart Logo"
                  className="h-8 w-8 object-contain transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                  Smart Mart
                </span>
                <span className="text-xs text-gray-500 -mt-1 group-hover:text-gray-700 transition-colors">
                  Your Shopping Companion
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="relative px-6 py-2.5 text-gray-700 font-medium rounded-full
                overflow-hidden group transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2">
                <span className="absolute inset-0 w-0 bg-gray-100 transition-all duration-300 ease-out group-hover:w-full"></span>
                <span className="relative text-sm">Login</span>
              </button>
              <button className="group relative px-7 py-2.5 rounded-full bg-white
                transform hover:shadow-lg active:scale-95 transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2">
                {/* Animated gradient border - Updated to black/gray */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 animate-gradient"></div>
                <div className="absolute inset-[2px] rounded-full bg-white"></div>
                <div className="relative flex items-center space-x-1">
                  <span className="text-lg font-light leading-none mb-0.5 group-hover:rotate-90 transition-transform duration-300">+</span>
                  <span className="font-medium text-sm text-gray-800">SELL</span>
                </div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-600" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search and Location Bar */}
        <div className="border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3">
              {/* Location Dropdown */}
              <div className="relative w-full md:w-auto" ref={dropdownRef}>
                <button
                  onClick={() => toggleDropdown('location')}
                  className="flex items-center justify-between space-x-2 px-3 py-2 rounded-lg bg-white hover:bg-gray-50 
                    transition-colors duration-200 min-w-[160px] text-sm border border-gray-200
                    focus:outline-none focus:ring-2 focus:ring-gray-200 w-full md:w-auto"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-700 font-medium">{selectedLocation}</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 
                    ${activeDropdown === 'location' ? 'rotate-180' : ''}`} />
                </button>

                {/* Location Dropdown Menu */}
                {activeDropdown === 'location' && (
                  <div className="absolute top-full left-0 mt-2 w-full md:w-64 rounded-lg bg-white shadow-lg 
                    border border-gray-200 py-1 z-50 animate-fadeIn">
                    <button
                      className="w-full text-left px-4 py-2.5 text-blue-600 hover:bg-blue-50 
                        transition-colors duration-200 flex items-center space-x-2 
                        border-b border-gray-100 text-sm font-medium"
                    >
                      <MapPin className="h-4 w-4" />
                      <span>Use current location</span>
                    </button>
                    {australianStates.map((state) => (
                      <button
                        key={state.name}
                        onClick={() => {
                          setSelectedLocation(state.name);
                          toggleDropdown('location');
                        }}
                        className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 
                          transition-colors duration-200 text-sm flex items-center space-x-2"
                      >
                        {state.icon}
                        <span>{state.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Bar with Button */}
              <div className="flex-1 flex">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search for anything..."
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-l-lg border border-r-0 border-gray-200 
                      focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all duration-200"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <button className="px-6 py-2 bg-gray-800 text-white rounded-r-lg hover:bg-gray-700 
                  transition-colors duration-200 flex items-center justify-center">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Bar - Redesigned */}
        <div className="border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className=" md:py-0 relative" ref={dropdownRef}>
              <div className="flex flex-col md:flex-row md:items-center md:space-x-6 md:h-8">
                {/* All Categories Dropdown - Improved Styling */}
                <div className="relative w-full md:w-auto mb-3 md:mb-0">
                  <button
                    onClick={() => toggleDropdown('categories')}
                    className="flex items-center justify-between md:justify-start w-full md:w-auto px-4 py-2 md:py-0
                      space-x-2 text-gray-700 hover:text-gray-900 text-sm font-medium
                      bg-gray-50 md:bg-transparent rounded-lg md:rounded-none"
                  >
                    <div className="flex items-center space-x-2">
                      <ShoppingBag className="h-3 w-3 text-gray-600" />
                      <span className='text-xs'>ALL CATEGORIES</span>
                    </div>
                    <ChevronDown className={`h-3 w-3 transition-transform duration-200 
                      ${activeDropdown === 'categories' ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Categories Mega Dropdown - Redesigned */}
                  {activeDropdown === 'categories' && (
                    <div className="absolute top-full left-0 mt-2 w-full md:w-[250px] bg-white shadow-xl 
                      border border-gray-200 rounded-lg z-50 p-6 animate-fadeIn">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(categories).map(([category, { icon, items }]) => (
                          <div key={category} className="space-y-4">
                            <div className="flex items-center space-x-3 pb-2 border-b border-gray-100">
                              <div className="p-2 bg-gray-50  rounded-lg">{icon}</div>
                              <span className="font-medium text-sm text-gray-800">{category}</span>
                            </div>
                            <div className="space-y-3">
                              {items.map((item) => (
                                <div key={item.name} className="space-y-2">
                                  <a href="#" className="text-xs  text-gray-700 hover:text-gray-900 
                                    transition-colors duration-200">
                                    {item.name}
                                  </a>
                       
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Popular Categories - Mobile Responsive */}
                <div className="md:flex hidden  flex-wrap md:flex-nowrap gap-3 md:gap-6 md:items-center">
                  <a href="#" className="text-xs text-gray-600 hover:text-gray-900 transition-colors duration-200 
                    flex items-center space-x-1.5 bg-gray-50 md:bg-transparent px-3 py-2 md:p-0 rounded-full md:rounded-none">
                    <Car className="h-3.5 w-3.5" />
                    <span>Cars</span>
                  </a>
                  <a href="#" className="text-xs text-gray-600 hover:text-gray-900 transition-colors duration-200 
                    flex items-center space-x-1.5 bg-gray-50 md:bg-transparent px-3 py-2 md:p-0 rounded-full md:rounded-none">
                    <Truck className="h-3.5 w-3.5" />
                    <span>Commercial</span>
                  </a>
                  <a href="#" className="text-xs text-gray-600 hover:text-gray-900 transition-colors duration-200 
                    flex items-center space-x-1.5 bg-gray-50 md:bg-transparent px-3 py-2 md:p-0 rounded-full md:rounded-none">
                    <CarFront className="h-3.5 w-3.5" />
                    <span>SUVs</span>
                  </a>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Improved */}
      <div className={`md:hidden fixed top-16 left-0 right-0 z-60 transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden bg-white border-b border-gray-100 shadow-lg`}>
        <div className="px-4 py-6 space-y-4">
          <button className="w-full px-4 py-3 text-gray-700 font-medium rounded-lg
            hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 flex items-center justify-center">
            <span className="mr-2">Login</span>
          </button>
          <button className="w-full px-4 py-3 text-white font-medium rounded-lg
            bg-gray-800 hover:bg-gray-700 active:bg-gray-900 transition-all duration-200 flex items-center justify-center">
            <span className="mr-2">SELL</span> <span className="text-lg">+</span>
          </button>
          
          {/* Mobile Category Links */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">Browse Categories</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(categories).map(([category, { icon }]) => (
                <a key={category} href="#" className="flex items-center space-x-2 p-3 rounded-lg
                  border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-200">
                  <div className="text-gray-600">{icon}</div>
                  <span className="text-sm text-gray-700">{category}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar - Mobile responsive */}
      <div className="h-[180px] md:h-[120px]"></div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </>
  );
};

export default Navbar;