// ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Heart } from 'lucide-react';
// 1. Import from the lazy-load-image library
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // optional blur effect

const ProductCard = ({
  item,
  hoveredCard,
  setHoveredCard,
  likedItems,
  toggleLike,
}) => {
  return (
    <Link
      to={`/product/${item.id}`}
      onMouseEnter={() => setHoveredCard(item.title)}
      onMouseLeave={() => setHoveredCard(null)}
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {/* 2. Use LazyLoadImage instead of <img> */}
        <LazyLoadImage
          src={item.image}
          alt={item.title}
          effect="blur" // you can use "opacity" or "black-and-white" too
          className={`w-full h-full object-cover transition-transform duration-500 ${
            hoveredCard === item.title ? 'scale-105' : 'scale-100'
          }`}
        />

        {/* Like button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleLike(item.title);
          }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              likedItems.has(item.title)
                ? 'text-red-500 fill-current'
                : 'text-gray-500 group-hover:text-gray-700'
            }`}
          />
        </button>

        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="p-3 space-y-2">
        <div className="space-y-0.5">
          <h3 className="font-bold text-base text-gray-800 font-['Inter']">
            {item.price}
          </h3>
          <p className="text-gray-700 text-xs font-medium line-clamp-1">
            {item.title}
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-gray-500">
          <div className="flex items-center">
            <MapPin className="w-3 h-3 mr-0.5 flex-shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-0.5 flex-shrink-0" />
            <span>{item.time}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
