// frontend/src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Heart } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductCard = ({ item, hoveredCard, setHoveredCard, likedItems, toggleLike }) => {
  // Format rent type text
  const getRentTypeText = (type) => {
    switch(type) {
      case 'daily':
        return 'day';
      case 'weekly':
        return 'week';
      case 'monthly':
        return 'month';
      default:
        return type;
    }
  };

  // If product is for rent and has a rentType, append the appropriate period
  const priceText = item.listingType === 'rent' && item.rentType 
    ? `$${item.price}/${getRentTypeText(item.rentType)}`
    : `$${item.price}`;

  return (
    <Link
      to={`/product/${item.id}`}
      onMouseEnter={() => setHoveredCard(item.title)}
      onMouseLeave={() => setHoveredCard(null)}
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <div className="absolute inset-0">
          <LazyLoadImage
            src={item.image}
            alt={item.title}
            effect="blur"
            wrapperClassName="!absolute inset-0"
            className={`w-full h-full object-cover object-center transition-transform duration-500 ${
              hoveredCard === item.title ? 'scale-105' : 'scale-100'
            }`}
            style={{ minWidth: '100%', minHeight: '100%' }}
          />
        </div>
        {/* Listing Type Tag - Top Left */}
        {item.listingType && (
          <div className="absolute top-1.5 left-1.5 z-10">
            <div className="bg-black text-white text-[10px] px-1.5 py-0.5 rounded">
              {item.listingType === 'rent' ? 'For Rent' : 'For Sale'}
            </div>
          </div>
        )}
        {/* Heart Button - Top Right */}
        <div className="absolute top-1.5 right-1.5">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleLike(item.title);
            }}
            className="p-1 rounded-full bg-white/90 hover:bg-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <Heart
              className={`w-3 h-3 transition-colors ${
                likedItems.has(item.title)
                  ? 'text-red-500 fill-current'
                  : 'text-gray-500 group-hover:text-gray-700'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="p-2 space-y-1">
        <div className="space-y-0.5">
          <h3 className="font-bold text-sm text-gray-800 font-['Inter']">
            {priceText}
          </h3>
          <p className="text-gray-700 text-[11px] font-medium line-clamp-1">
            {item.title}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
          <div className="flex items-center">
            <MapPin className="w-2.5 h-2.5 mr-0.5 flex-shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-2.5 h-2.5 mr-0.5 flex-shrink-0" />
            <span>{item.time}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
