// CategoriesNav.js
import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Car, Laptop, Building2, Sofa,
  ShoppingBag, ChevronDown
} from 'lucide-react';

const categories = {
  'Electronics': {
    icon: <Laptop className="h-5 w-5" />,
    items: [
      { name: 'Smartphones' },
      { name: 'Laptops' },
      { name: 'Tablets' },
      { name: 'View all electronics →' },
    ],
  },
  'Vehicles': {
    icon: <Car className="h-5 w-5" />,
    items: [
      { name: 'Cars' },
      { name: 'Motorcycles' },
      { name: 'Bikes' },
      { name: 'View all vehicles →' },
    ],
  },
  'Property': {
    icon: <Building2 className="h-5 w-5" />,
    items: [
      { name: 'Houses' },
      { name: 'Apartments' },
      { name: 'Commercial' },
      { name: 'View all property →' },
    ],
  },
  'Home Decor': {
    icon: <Sofa className="h-5 w-5" />,
    items: [
      { name: 'Furniture' },
      { name: 'Lighting' },
      { name: 'Kitchen & Dining' },
      { name: 'View all home decor →' },
    ],
  },
};

const CategoriesNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const categoryDropdownRef = useRef(null);

  // If the path starts with /category, don't render the nav
  if (location.pathname.startsWith('/category')) {
    return null;
  }

  // Get the current state from URL if it exists
  const searchParams = new URLSearchParams(location.search);
  const currentState = searchParams.get('state');
  
  const toggleDropdown = () => {
    setActiveDropdown(activeDropdown === 'categories' ? null : 'categories');
  };

  const handleCategoryClick = (category, subcategory) => {
    setActiveDropdown(null);
    
    // Base URL and params
    const baseUrl = `/category/${category}`;
    const params = new URLSearchParams();
    params.append('page', '1');
    
    // Add state if it exists
    if (currentState) {
      params.append('state', currentState);
    }
    
    // If it's a "View all" link, only navigate with category
    if (subcategory.includes('View all')) {
      navigate(`${baseUrl}?${params.toString()}`);
      return;
    }

    // For specific subcategories, add subcategory parameter
    params.append('subcategory', subcategory);
    navigate(`${baseUrl}?${params.toString()}`);
  };

  const handleQuickCategoryClick = (category) => {
    const params = new URLSearchParams();
    params.append('page', '1');
    if (currentState) {
      params.append('state', currentState);
    }
    navigate(`/category/${category}?${params.toString()}`);
  };

  return (
    <div className="mt-9 bg-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-2 md:py-3 relative">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
            {/* All Categories Dropdown */}
            <div className="relative w-full md:w-auto mb-3 md:mb-0" ref={categoryDropdownRef}>
              <button
                onClick={toggleDropdown}
                className={`flex items-center justify-between md:justify-start w-full md:w-auto px-4 py-2 md:py-2
                    space-x-2.5 text-gray-700 hover:text-gray-900 text-sm font-medium rounded-lg
                    ${activeDropdown === 'categories' ? 'bg-gray-100 shadow-inner' : 'bg-gray-50 hover:shadow-md'}
                    transition-all duration-200 ease-in-out`}
              >
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="h-4 w-4 text-gray-600" />
                  <span className="text-xs font-semibold tracking-wide uppercase">ALL CATEGORIES</span>
                </div>
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-300 ease-in-out ${
                    activeDropdown === 'categories' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Mega Dropdown for Categories */}
              {activeDropdown === 'categories' && (
                <div
                  className="absolute top-full left-0 mt-2 w-full md:w-[650px] bg-white shadow-xl 
                    border border-gray-200 rounded-xl z-20 p-5 animate-fadeIn transform origin-top"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 md:gap-8">
                    {Object.entries(categories).map(([category, { icon, items }]) => (
                      <div key={category} className="space-y-3 group">
                        <div
                          className="flex items-center space-x-3 pb-2
                                 group-hover:text-gray-900 transition-colors duration-300"
                        >
                          <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 
                                      transition-colors duration-300 transform group-hover:scale-105">
                            {icon}
                          </div>
                          <span className="font-medium text-sm text-gray-800 group-hover:text-gray-900 
                                       transition-colors duration-300">
                            {category}
                          </span>
                        </div>
                        <div className="space-y-2.5 pl-3">
                          {items.map((item) => (
                            <button
                              key={item.name}
                              onClick={() => handleCategoryClick(category, item.name)}
                              className={`block w-full text-left text-sm ${
                                item.name.includes('View all')
                                  ? 'text-gray-900/90 hover:text-black font-medium pt-1'
                                  : 'text-gray-600 hover:text-gray-900 hover:font-medium'
                              } transition-all duration-200 transform hover:translate-x-1.5 hover:scale-[1.02]`}
                            >
                              {item.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Popular Categories */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex items-center space-x-4 pb-2 md:pb-0 md:h-full">
                <button
                  onClick={() => handleQuickCategoryClick('Vehicles')}
                  className="text-xs whitespace-nowrap text-gray-600 hover:text-gray-900 transition-all duration-200 
                    flex items-center space-x-1.5 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg hover:shadow-sm 
                    transform hover:scale-105"
                >
                  <Car className="h-3.5 w-3.5" />
                  <span>Vehicles</span>
                </button>
             
                <button
                  onClick={() => handleQuickCategoryClick('Electronics')}
                  className="text-xs whitespace-nowrap text-gray-600 hover:text-gray-900 transition-all duration-200 
                    flex items-center space-x-1.5 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg hover:shadow-sm 
                    transform hover:scale-105"
                >
                  <Laptop className="h-3.5 w-3.5" />
                  <span>Electronics</span>
                </button>
                <button
                  onClick={() => handleQuickCategoryClick('Home Decor')}
                  className="text-xs whitespace-nowrap text-gray-600 hover:text-gray-900 transition-all duration-200 
                    flex items-center space-x-1.5 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg hover:shadow-sm 
                    transform hover:scale-105"
                >
                  <Sofa className="h-3.5 w-3.5" />
                  <span>Home Decor</span>
                </button>
                <button
                  onClick={() => handleQuickCategoryClick('Property')}
                  className="text-xs whitespace-nowrap text-gray-600 hover:text-gray-900 transition-all duration-200 
                    flex items-center space-x-1.5 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg hover:shadow-sm 
                    transform hover:scale-105"
                >
                  <Building2 className="h-3.5 w-3.5" />
                  <span>Property</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesNav;
