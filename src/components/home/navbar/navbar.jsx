import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, Search, ChevronDown, MapPin, Globe, User, MessageSquare, Settings, LogOut, Heart, Package, FileText } from 'lucide-react';

import { selectUser, selectIsAuthenticated } from '../../../store/slices/userSlice';
import { logoutUser } from '../../../store/thunks/authThunks';
import LoginModal from '../../registration/registrationCard';

import CategoriesNav from './categoriesNav';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Australia');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(3);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get user data from Redux store
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  const australianStates = [
    { name: 'Australia', icon: <Globe className="h-4 w-4" /> },
    { name: 'New South Wales', icon: <MapPin className="h-4 w-4" /> },
    { name: 'Victoria', icon: <MapPin className="h-4 w-4" /> },
    { name: 'Queensland', icon: <MapPin className="h-4 w-4" /> },
    { name: 'Western Australia', icon: <MapPin className="h-4 w-4" /> },
    { name: 'South Australia', icon: <MapPin className="h-4 w-4" /> },
    { name: 'Tasmania', icon: <MapPin className="h-4 w-4" /> },
    { name: 'Northern Territory', icon: <MapPin className="h-4 w-4" /> },
    { name: 'Australian Capital Territory', icon: <MapPin className="h-4 w-4" /> },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    }
    
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const handleLoginSuccess = (userData) => {
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsUserDropdownOpen(false);
  };

  const profileMenuItems = [
    { 
      icon: <User className="h-4 w-4" />, 
      label: 'My Profile',
      description: 'View and edit your profile',
      action: () => {} 
    },
    { 
      icon: <Package className="h-4 w-4" />, 
      label: 'My Listings',
      description: 'Manage your active listings',
      action: () => {} 
    },
    { 
      icon: <Heart className="h-4 w-4" />, 
      label: 'Saved Items',
      description: 'View your favorites',
      action: () => {} 
    },
    { 
      icon: <LogOut className="h-4 w-4" />, 
      label: 'Logout',
      description: 'Sign out of your account',
      action: handleLogout,
      className: 'text-red-600 hover:bg-red-50' 
    }
  ];

  // Render user avatar or fallback to initial
  const renderUserAvatar = () => {
    if (user?.avatar) {
      return (
        <img 
          src={user.avatar || "/placeholder.svg"} 
          alt={user.name} 
          className="w-8 h-8 rounded-full object-cover shadow-md group-hover:shadow-lg
            transition-shadow duration-200"
        />
      );
    }
    
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-black to-gray-800
        flex items-center justify-center text-white font-medium shadow-md group-hover:shadow-lg
        transition-shadow duration-200">
        {user?.name?.charAt(0).toUpperCase()}
      </div>
    );
  };

  // Render user avatar in dropdown
  const renderUserAvatarLarge = () => {
    if (user?.avatar) {
      return (
        <img 
          src={user.avatar || "/placeholder.svg"} 
          alt={user.name} 
          className="w-12 h-12 rounded-full object-cover shadow-md
            transition-transform duration-300 group-hover:scale-105"
        />
      );
    }
    
    return (
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-black to-gray-800
        flex items-center justify-center text-white text-lg font-medium shadow-md
        transition-transform duration-300 group-hover:scale-105">
        {user?.name?.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <>
      <nav className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="p-1.5 overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src="/mart.png"
                  alt="Smart Mart Logo"
                  className="h-8 w-8 object-contain transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                  Smart Mart
                </span>
                <span className="text-xs text-gray-500 -mt-1 group-hover:text-gray-700 transition-colors">
                  Your Shopping Companion
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  {/* Messages Button */}
                  <button
                    className="relative p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
                    title="Messages"
                  >
                    <MessageSquare className="h-5 w-5 text-gray-700" />
                    {unreadMessages > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadMessages}
                      </span>
                    )}
                  </button>

                  {/* Enhanced Profile Dropdown */}
                  <div className="relative" ref={userDropdownRef}>
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-gray-100 transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-gray-200 group"
                    >
                      {renderUserAvatar()}
                    </button>

                    {isUserDropdownOpen && (
                      <div className="absolute z-60 right-0 mt-2 w-70 bg-white rounded-2xl shadow-lg border border-gray-200 
                        overflow-hidden transform transition-all duration-200 ease-out">
                        {/* Profile Header */}
                        <div className="px-6 py-5 bg-gradient-to-br from-gray-50 to-gray-100">
                          <div className="flex items-center space-x-4">
                            <div className="relative group">
                              {renderUserAvatarLarge()}
                              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 
                                transition-opacity duration-300"></div>
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-sm font-semibold text-gray-900">{user?.name}</h3>
                              <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          {profileMenuItems.map((item, index) => (
                            <button
                              key={index}
                              onClick={item.action}
                              className={`w-full flex items-start space-x-3 px-6 py-3 hover:bg-gray-50 
                                transition-colors ${item.className || 'text-gray-700'}`}
                            >
                              <span className="mt-0.5 ">{item.icon}</span>
                              <div className="text-left">
                                <span className="block text-xs font-medium">{item.label}</span>
                                <span className="block text-[10px] text-gray-500 mt-0.5">{item.description}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-6 py-2 text-gray-700 font-medium rounded-full bg-gray-50
                    hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 
                    focus:ring-gray-200 focus:ring-offset-2 text-sm"
                >
                  Login
                </button>
              )}

              {/* SELL Button */}
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    navigate('/categories');
                  } else {
                    setIsLoginModalOpen(true);
                  }
                }}
                className="group relative px-7 py-2.5 rounded-full bg-white transform 
                  hover:shadow-lg active:scale-95 transition-all duration-200 focus:outline-none 
                  focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 
                  animate-gradient"></div>
                <div className="absolute inset-[2px] rounded-full bg-white"></div>
                <div className="relative flex items-center space-x-1">
                  <span className="text-lg font-light leading-none mb-0.5 group-hover:rotate-90 transition-transform duration-300">
                    +
                  </span>
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
                  className="flex items-center justify-between space-x-2 px-3 py-2 rounded-lg 
                    bg-white hover:bg-gray-50 transition-colors duration-200 min-w-[160px] 
                    text-sm border border-gray-200 focus:outline-none focus:ring-2 
                    focus:ring-gray-200 w-full md:w-auto"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-700 font-medium">{selectedLocation}</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 
                    ${activeDropdown === 'location' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'location' && (
                  <div className="absolute top-full left-0 mt-2 w-full md:w-64 rounded-lg bg-white 
                    shadow-lg border border-gray-200 py-1 z-50 animate-fadeIn">
                    <button className="w-full text-left px-4 py-2.5 text-blue-600 hover:bg-blue-50 
                      transition-colors duration-200 flex items-center space-x-2 border-b 
                      border-gray-100 text-sm font-medium">
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

              {/* Search Bar */}
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
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[60px] left-0 right-0 z-60 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-screen opacity-100 shadow-xl' : 'max-h-0 opacity-0'
        } overflow-hidden bg-white border-b border-gray-100`}
      >
        <div className="px-4 py-6 space-y-6">
          {/* Mobile Login / Profile / Sell / etc. */}
          <div className="grid grid-cols-2 gap-3">
            {isAuthenticated ? (
              <>
                {/* Chat Button */}
                <button
                  className="w-full px-4 py-3 text-gray-700 font-medium rounded-lg
                    bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 flex items-center justify-center"
                >
                  <MessageSquare className="h-3 w-3 mr-2" />
                  <span>Chat</span>
                </button>
              
                {/* Profile Button */}
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="w-full px-4 py-3 text-gray-700 font-medium rounded-lg
                    bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 flex items-center justify-center"
                >
                  <User className="h-3 w-3 mr-2" />
                  <span>Profile</span>
                </button>
                {/* My Listings Button */}
                <button
                  className="w-full px-4 py-3 text-gray-700 font-medium rounded-lg
                    bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 flex items-center justify-center"
                  onClick={() => {
                    // Placeholder for My Listings action
                  }}
                >
                  <Package className="h-3 w-3 mr-2" />
                  <span>Listings</span>
                </button>
                {/* Saved Items Button */}
                <button
                  className="w-full px-4 py-3 text-gray-700 font-medium rounded-lg
                    bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 flex items-center justify-center"
                  onClick={() => {
                    // Placeholder for Saved Items action
                  }}
                >
                  <Heart className="h-3 w-3 mr-2" />
                  <span>Items</span>
                </button>
            
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-white font-medium rounded-lg bg-red-900 hover:bg-red-900/80 active:bg-red-700 transition-all duration-200 flex items-center justify-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span className="mr-1">Logout</span>
                </button>

                {/* SELL Button for logged in users */}
                <button
                  onClick={() => navigate('/categories')}
                  className="w-full px-4 py-3 text-white font-medium rounded-lg bg-gray-800 hover:bg-gray-700 active:bg-gray-900 transition-all duration-200 flex items-center justify-center"
                >
                  <span className="mr-1">SELL</span>
                  <span className="text-lg">+</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="w-full px-4 py-3 text-gray-700 font-medium rounded-lg bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 flex items-center justify-center"
                >
                  <span>Login</span>
                </button>
                <button
                  onClick={() => {
                    if (isAuthenticated) {
                      navigate('/categories');
                    } else {
                      setIsLoginModalOpen(true);
                    }
                  }}
                  className="w-full px-4 py-3 text-white font-medium rounded-lg bg-gray-800 hover:bg-gray-700 active:bg-gray-900 transition-all duration-200 flex items-center justify-center"
                >
                  <span className="mr-1">SELL</span>
                  <span className="text-lg">+</span>
                </button>
              </>
            )}
          </div>
          {/* Additional mobile links can go here */}
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-[90px]" />

      {/* Categories Navigation (separate component) */}
      <CategoriesNav />

      {/* Login Modal with callback */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* CSS Animations & Utilities */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
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
        /* Hide scrollbar for Chrome, Safari, and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge, and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default Navbar;
