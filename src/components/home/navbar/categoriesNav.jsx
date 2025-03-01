// CategoriesNav.js
import React, { useState, useRef } from 'react';
import {
  Car, Laptop, Building2, Sofa,
  ShoppingBag, ChevronDown
} from 'lucide-react';

const categories = {
  'Vehicles': {
    icon: <Car className="h-5 w-5" />,
    items: [
      { name: 'Cars' },
      { name: 'SUVs' },
      { name: 'Commercial' },
    ],
  },
  'Property': {
    icon: <Building2 className="h-5 w-5" />,
    items: [
      { name: 'Apartments' },
      { name: 'Houses' },
      { name: 'Land' },
    ],
  },
  'Electronics': {
    icon: <Laptop className="h-5 w-5" />,
    items: [
      { name: 'Computers' },
      { name: 'Phones' },
      { name: 'Tablets' },
    ],
  },
  'Home Decor': {
    icon: <Sofa className="h-5 w-5" />,
    items: [
      { name: 'Furniture' },
      { name: 'Appliances' },
      { name: 'Garden' },
    ],
  },

};

const CategoriesNav = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const categoryDropdownRef = useRef(null);

  const toggleDropdown = () => {
    setActiveDropdown(activeDropdown === 'categories' ? null : 'categories');
  };

  return (
    <div className="border-t mt-9 border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-2 md:py-0 relative">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 md:h-10">
            {/* All Categories Dropdown */}
            <div className="relative w-full md:w-auto mb-3 md:mb-0" ref={categoryDropdownRef}>
              <button
                onClick={toggleDropdown}
                className={`flex items-center justify-between md:justify-start w-full md:w-auto px-4 py-2 md:py-2
                    space-x-2 text-gray-700 hover:text-gray-900 text-sm font-medium rounded-md
                    ${activeDropdown === 'categories' ? 'bg-gray-100' : 'bg-gray-50'}
                    hover:bg-gray-100 transition-colors duration-200`}
              >
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="h-4 w-4 text-gray-600" />
                  <span className="text-xs font-semibold tracking-wide">ALL CATEGORIES</span>
                </div>
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${
                    activeDropdown === 'categories' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Mega Dropdown for Categories */}
              {activeDropdown === 'categories' && (
                <div
                  className="absolute top-full left-0 mt-2 w-full md:w-[600px] bg-white shadow-xl 
                    border border-gray-200 rounded-lg z-20 p-4 md:p-6 animate-fadeIn"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {Object.entries(categories).map(([category, { icon, items }]) => (
                      <div key={category} className="space-y-3 group">
                        <div
                          className="flex items-center space-x-3 pb-2 border-b border-gray-100
                                 group-hover:border-gray-300 transition-colors duration-200"
                        >
                          <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors duration-200">
                            {icon}
                          </div>
                          <span className="font-medium text-sm text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
                            {category}
                          </span>
                        </div>
                        <div className="space-y-2.5 pl-2">
                          {items.map((item) => (
                            <a
                              key={item.name}
                              href="#"
                              className="block text-xs text-gray-600 hover:text-gray-900 hover:font-medium
                                       transition-all duration-200 transform hover:translate-x-1"
                            >
                              {item.name}
                            </a>
                          ))}
                          <a
                            href="#"
                            className="block text-xs text-gray-900/80 hover:text-black font-medium
                                     transition-colors duration-200 pt-1"
                          >
                            View all {category.toLowerCase()} →
                          </a>
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
                <a
                  href="#"
                  className="text-xs whitespace-nowrap text-gray-600 hover:text-gray-900 transition-colors duration-200 
                    flex items-center space-x-1.5 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full"
                >
                  <Car className="h-3.5 w-3.5" />
                  <span>Vehicles</span>
                </a>
             
                <a
                  href="#"
                  className="text-xs whitespace-nowrap text-gray-600 hover:text-gray-900 transition-colors duration-200 
                    flex items-center space-x-1.5 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full"
                >
                  <Laptop className="h-3.5 w-3.5" />
                  <span>Electronics</span>
                </a>
                <a
                  href="#"
                  className="text-xs whitespace-nowrap text-gray-600 hover:text-gray-900 transition-colors duration-200 
                    flex items-center space-x-1.5 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full"
                >
                  <Sofa className="h-3.5 w-3.5" />
                  <span>Home Decor</span>
                </a>
                <a
                  href="#"
                  className="text-xs whitespace-nowrap text-gray-600 hover:text-gray-900 transition-colors duration-200 
                    flex items-center space-x-1.5 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full"
                >
                  <Building2 className="h-3.5 w-3.5" />
                  <span>Property</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesNav;
