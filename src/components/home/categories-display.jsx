// frontend/src/components/MarketplaceCategories.jsx
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { fetchRandomProducts } from '../../api/productapi';
import ProductCard from './productCard';

const CACHE_KEY = 'marketplace_categories';
const CACHE_DURATION = 5 * 60 * 60 * 1000; // 5 hours in milliseconds

const MarketplaceCategories = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [likedItems, setLikedItems] = useState(new Set());

  // Helper function to compute relative time (e.g., "2 days ago")
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + " year" + (interval > 1 ? "s" : "") + " ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " month" + (interval > 1 ? "s" : "") + " ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " day" + (interval > 1 ? "s" : "") + " ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hour" + (interval > 1 ? "s" : "") + " ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " minute" + (interval > 1 ? "s" : "") + " ago";
    }
    return Math.floor(seconds) + " seconds ago";
  };

  const transformData = (randomData) => {
    const transformed = Object.keys(randomData).map((key) => ({
      title: key,
      items: randomData[key].map((product) => ({
        id: product._id,
        image: product.images[0],
        title: product.title,
        price: product.price,
        listingType: product.listingType,
        rentType: product.rentType,
        location: `${product.city}, ${product.state}`,
        time: timeAgo(new Date(product.createdAt)),
      })),
    }));
    return transformed.filter(category => category.items && category.items.length > 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check cache first
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { data, expiry } = JSON.parse(cachedData);
          // Check if cache is still valid
          if (expiry > Date.now()) {
            setCategoriesData(data);
            return;
          } else {
            // Clear expired cache
            localStorage.removeItem(CACHE_KEY);
          }
        }

        // Fetch fresh data if no cache or cache expired
        const randomData = await fetchRandomProducts();
        const transformed = transformData(randomData);
        
        // Cache the transformed data
        const cacheData = {
          data: transformed,
          expiry: Date.now() + CACHE_DURATION
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        
        setCategoriesData(transformed);
      } catch (error) {
        console.error('Error loading random products:', error);
      }
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
      {categoriesData.map((category) => (
        // Only render a category block if there are items.
        category.items.length > 0 && (
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
        )
      ))}
    </div>
  );
};

export default MarketplaceCategories;
