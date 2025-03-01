import React from 'react';
import { Heart, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HorizontalProductCard = ({ item, hoveredCard, setHoveredCard, likedItems, toggleLike }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${item.id}`);
  };

  return (
    <div
      className="group bg-white rounded-sm border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setHoveredCard(item.title)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="w-full sm:w-72 h-48 sm:h-56 relative flex-shrink-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(item.title);
            }}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                likedItems.has(item.title)
                  ? 'text-red-500 fill-current'
                  : 'text-gray-500 group-hover:text-gray-700'
              }`}
            />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 group-hover:text-black transition-colors">
                  $ {item.price.toLocaleString()}
                  {item.rentType && (
                    <span className="text-sm font-medium text-gray-500 ml-1">
                      / {item.rentType.toLowerCase()}
                    </span>
                  )}
                </h3>
                <h4 className="text-sm sm:text-base text-gray-700 line-clamp-2 group-hover:text-gray-900 transition-colors">
                  {item.title}
                </h4>
              </div>
              <span className={`self-start px-3 py-1.5 rounded-sm text-xs font-medium tracking-wide ${
                item.listingType === 'sell' 
                ? 'bg-gray-100 text-gray-800' 
                : 'bg-gray-100 text-gray-800'
              }`}>
                {item.listingType === 'sell' ? 'For Sale' : 'For Rent'}
              </span>
            </div>

            <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-400" />
                <span className="group-hover:text-gray-700 transition-colors">{item.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-400" />
                <span className="group-hover:text-gray-700 transition-colors">{item.time}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-6">
            <button 
              onClick={handleCardClick}
              className="w-full bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-sm hover:bg-gray-800 
                transition-all duration-300 text-sm font-medium transform hover:translate-y-[-1px] 
                hover:shadow-lg active:translate-y-0 active:shadow-md"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalProductCard; 