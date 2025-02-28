import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Car, Home, ShoppingBag, Laptop, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategoryModal = ({ isOpen, onClose, defaultCategory = "Electronics", categories }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Update local state when defaultCategory (from parent) changes
  useEffect(() => {
    setSelectedCategory(defaultCategory);
    setSelectedSubcategory(null);
  }, [defaultCategory]);

  const subcategories = {
    Electronics: [
      "Smartphones",
      "Laptops",
      "Tablets",
      "TVs & Audio",
      "Cameras",
      "Smart Watches",
      "Accessories",
      "Gaming",
      "Computer Parts",
    ],
    Vehicles: [
      "Cars",
      "Motorcycles",
      "Bikes",
      "Spare Parts",
      "Commercial Vehicles",
      "Boats",
      "Automotive Tools",
      "Rentals",
    ],
    Property: [
      "Apartments",
      "Houses",
      "Land",
      "Commercial",
      "Vacation Rentals",
      "Rooms",
      "Office Space",
      "Storage",
    ],
    "Home Decor": [
      "Furniture",
      "Kitchen Appliances",
      "Lighting",
      "Decor & Art",
      "Garden",
      "Bedding",
      "Bathroom",
      "Rugs & Carpets",
    ],
  };

  const allCategories = [
    { title: "Electronics", icon: <Laptop className="h-3.5 w-3.5" /> },
    { title: "Vehicles", icon: <Car className="h-3.5 w-3.5" /> },
    { title: "Property", icon: <Home className="h-3.5 w-3.5" /> },
    { title: "Home Decor", icon: <ShoppingBag className="h-3.5 w-3.5" /> },
  ];

  const handleContinue = () => {
    if (selectedSubcategory) {
      // Close the modal and navigate to the ad form with selected info.
      onClose();
      navigate("/add", {
        state: { category: selectedCategory, subcategory: selectedSubcategory },
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 mt-16 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal Container */}
      <motion.div
        className="relative h-[calc(100vh-40px)] w-full overflow-hidden bg-white shadow-xl transition-all duration-300"
        style={{ top: "15px" }}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex justify-center mt-4 text-center p-3 bg-white">
          <div className="flex items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Post Your Ad</h2>
              <p className="mt-0.5 text-xs text-gray-500">Select a category to get started</p>
            </div>
          </div>
        </div>
        {/* Body */}
        <div className="p-3">
          <h3 className="mb-2 md:px-20 text-xs font-semibold text-gray-800 flex items-center">
            <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-white text-xs">
              1
            </span>
            Choose a category
          </h3>
          <div className="flex h-[calc(100vh-350px)] md:px-20 flex-col">
            <div className="flex-1 overflow-hidden border shadow-sm">
              <div className="grid h-full grid-cols-12 overflow-x-hidden">
                {/* Categories Column */}
                <div className="border-r overflow-y-auto overflow-x-hidden bg-gray-50 col-span-5">
                  {allCategories.map((cat, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex cursor-pointer items-center border-b p-2.5 transition-all hover:bg-gray-100 ${
                        selectedCategory === cat.title
                          ? "bg-gray-100 border-l-2 border-l-gray-900"
                          : "border-l-2 border-l-transparent"
                      }`}
                      onClick={() => setSelectedCategory(cat.title)}
                    >
                      <div
                        className={`mr-2 rounded-full p-1.5 ${
                          selectedCategory === cat.title
                            ? "bg-gray-900 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {cat.icon}
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          selectedCategory === cat.title ? "text-gray-900" : ""
                        }`}
                      >
                        {cat.title}
                      </span>
                      <ChevronRight
                        className={`ml-auto h-3.5 w-3.5 ${
                          selectedCategory === cat.title ? "text-gray-900" : "text-gray-300"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
                {/* Subcategories Column */}
                <div className="overflow-y-auto overflow-x-hidden bg-white col-span-7">
                  {subcategories[selectedCategory] && (
                    <div className="divide-y">
                      {subcategories[selectedCategory].map((subcat, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.01 }}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`cursor-pointer p-2.5 transition-all hover:bg-gray-50 ${
                            selectedSubcategory === subcat ? "bg-gray-50" : ""
                          }`}
                          onClick={() => setSelectedSubcategory(subcat)}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xs ${
                                selectedSubcategory === subcat ? "text-gray-900 font-medium" : "text-gray-700"
                              }`}
                            >
                              {subcat}
                            </span>
                            {selectedSubcategory === subcat && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                                className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-white"
                              >
                                <Check className="h-2.5 w-2.5" />
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="absolute bottom-8 bg-gray-50 left-0 right-0 border-t  p-3 shadow-inner">
          <div className="flex items-center  justify-between">
            <div className="text-xs mb-3 text-gray-500">
              {selectedSubcategory
                ? `Selected: ${selectedCategory} > ${selectedSubcategory}`
                : "Select a subcategory to continue"}
            </div>
            <button
              onClick={handleContinue}
              className={`rounded-md px-5 mb-3 py-1.5 text-xs font-medium transition-all ${
                selectedSubcategory
                  ? "bg-gray-900 text-white hover:bg-black shadow-sm"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!selectedSubcategory}
            >
              Continue
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CategoryModal;
