// MarketplaceCategories.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, MapPin, Heart } from 'lucide-react';
import marketplaceData from '../../json/marketplace-categories.json';

const CACHE_KEY = 'marketplaceData';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds

const MarketplaceCategories = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [likedItems, setLikedItems] = useState(new Set());
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

      if (cachedData && cachedTimestamp) {
        const age = Date.now() - parseInt(cachedTimestamp, 10);
        if (age < CACHE_EXPIRY) {
          setData(JSON.parse(cachedData));
          return;
        }
      }
      // If no cache or expired, load fresh data
      localStorage.setItem(CACHE_KEY, JSON.stringify(marketplaceData.categories));
      localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());
      setData(marketplaceData.categories);
    };
    fetchData();
  }, []);

  const toggleLike = (itemTitle) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemTitle)) {
        newSet.delete(itemTitle);
      } else {
        newSet.add(itemTitle);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8 font-['Plus_Jakarta_Sans']">
      {data.map((category) => (
        <div key={category.title} className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-0.5">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight font-['Inter']">
                {category.title}
              </h2>
              <p className="text-xs text-gray-500">
                Browse the latest {category.title.toLowerCase()} listings
              </p>
            </div>
            <button className="group flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-xs font-semibold transition-colors font-['Inter']">
              <span>View all</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Desktop grid view */}
          <div className="relative">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 hidden sm:grid">
              {category.items.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  hoveredCard={hoveredCard}
                  setHoveredCard={setHoveredCard}
                  likedItems={likedItems}
                  toggleLike={toggleLike}
                />
              ))}
            </div>

            {/* Mobile horizontal scroll view */}
            <div className="flex gap-3 overflow-x-auto pb-4 sm:hidden -mx-4 px-4 scroll-smooth scrollbar-hide">
              {category.items.map((item) => (
                <div className="w-[280px] flex-shrink-0" key={item.id}>
                  <ProductCard
                    item={item}
                    hoveredCard={hoveredCard}
                    setHoveredCard={setHoveredCard}
                    likedItems={likedItems}
                    toggleLike={toggleLike}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ProductCard component with lazy-loaded image
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
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-500 ${
            hoveredCard === item.title ? 'scale-105' : 'scale-100'
          }`}
        />
        {/* Stop the "like" button from navigating to product */}
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

export default MarketplaceCategories;
