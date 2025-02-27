"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Search, DollarSign, Tag, Home, Info, AlertCircle } from "lucide-react"
import { staggerContainer, staggerItem } from "./animations"

const FormStepTwo = ({ formState, errors = {} }) => {
  const { listingType, setListingType, rentType, setRentType, showBrandModel, showRentSellOption, getBrands } =
    formState

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      {/* Brand Section */}
      {showBrandModel && (
        <motion.div variants={staggerItem} className="mb-6">
          <label htmlFor="brand" className="font-medium text-gray-900 text-base block mb-2">
            Brand<span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <motion.select
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              id="brand"
              className={`w-full border rounded-lg p-3 pr-10 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 ${
                errors.brand ? "border-red-300 bg-red-50" : "border-gray-200"
              }`}
            >
              <option value="">Select brand</option>
              {getBrands().map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </motion.select>
            <Search className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          {errors.brand && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.brand}
            </p>
          )}
        </motion.div>
      )}

      {/* Condition Section (hidden for Property) */}
      {formState.category !== "Property" && (
        <motion.div variants={staggerItem} className="mb-6">
          <label className="font-medium text-gray-900 text-base block mb-2">
            Condition<span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className={`relative flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:shadow-sm transition-all duration-300 group flex-1 ${
                errors.condition ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-black"
              }`}
            >
              <input
                type="radio"
                name="condition"
                value="new"
                id="condition-new"
                defaultChecked
                className="w-3.5 h-3.5 text-black focus:ring-black focus:border-gray-300"
              />
              <div>
                <span className="font-medium text-gray-900 text-sm group-hover:text-black transition-colors">New</span>
                <p className="text-[10px] text-gray-500 mt-0.5">Never used</p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="absolute -top-2 -right-2 bg-green-500 text-white text-[9px] px-1.5 py-0.5 rounded-full"
              >
                Premium
              </motion.div>
            </motion.label>
            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className={`relative flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:shadow-sm transition-all duration-300 group flex-1 ${
                errors.condition ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-black"
              }`}
            >
              <input
                type="radio"
                name="condition"
                value="used"
                id="condition-used"
                className="w-3.5 h-3.5 text-black focus:ring-black focus:border-gray-300"
              />
              <div>
                <span className="font-medium text-gray-900 text-sm group-hover:text-black transition-colors">Used</span>
                <p className="text-[10px] text-gray-500 mt-0.5">Pre-owned, in working condition</p>
              </div>
            </motion.label>
          </div>
          {errors.condition && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.condition}
            </p>
          )}
        </motion.div>
      )}

      {/* Model Section */}
      {showBrandModel && (
        <motion.div variants={staggerItem} className="mb-6">
          <label htmlFor="model" className="font-medium text-gray-900 text-base block mb-2">
            Model
          </label>
          <motion.input
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            id="model"
            placeholder="Enter model"
            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
          />
        </motion.div>
      )}

      {/* Rent/Sell Option Section */}
      {showRentSellOption && (
        <motion.div variants={staggerItem} className="mb-6">
          <label className="font-medium text-gray-900 text-base block mb-2">
            Listing Type<span className="text-red-500 ml-1">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className={`flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition-all duration-300 ${
                listingType === "sell"
                  ? "bg-black text-white border-black shadow-sm"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name="listingType"
                value="sell"
                id="type-sell"
                checked={listingType === "sell"}
                onChange={() => setListingType("sell")}
                className="sr-only"
              />
              <Tag className="h-4 w-4" />
              <span className="font-medium text-sm">For Sale</span>
            </motion.label>
            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className={`flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition-all duration-300 ${
                listingType === "rent"
                  ? "bg-black text-white border-black shadow-sm"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name="listingType"
                value="rent"
                id="type-rent"
                checked={listingType === "rent"}
                onChange={() => setListingType("rent")}
                className="sr-only"
              />
              <Home className="h-4 w-4" />
              <span className="font-medium text-sm">For Rent</span>
            </motion.label>
          </div>

          <AnimatePresence>
            {listingType === "rent" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <label className="text-xs font-medium text-gray-900 block mb-2">Rent Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { type: "daily", icon: "🕒" },
                    { type: "weekly", icon: "📅" },
                    { type: "monthly", icon: "💼" },
                  ].map(({ type, icon }) => (
                    <motion.label
                      key={type}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-center gap-1.5 p-2 border rounded-lg cursor-pointer capitalize transition-all duration-300 text-xs ${
                        rentType === type
                          ? "bg-black border-black text-white font-medium shadow-sm"
                          : "border-gray-200 hover:border-gray-300 hover:bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="rentType"
                        value={type}
                        checked={rentType === type}
                        onChange={() => setRentType(type)}
                        className="sr-only"
                      />
                      <span>{icon}</span>
                      {type}
                    </motion.label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Price Section */}
      <motion.div variants={staggerItem} className="mb-6">
        <label htmlFor="price" className="font-medium text-gray-900 text-base block mb-2">
          Price<span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
          <motion.input
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            id="price"
            type="number"
            placeholder="Enter Price"
            className={`pl-10 w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 ${
              errors.price ? "border-red-300 bg-red-50" : "border-gray-200"
            }`}
          />
        </div>
        {errors.price && (
          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.price}
          </p>
        )}
        <div className="mt-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="negotiable"
            className="w-3.5 h-3.5 text-black focus:ring-black border-gray-300 rounded"
          />
          <label htmlFor="negotiable" className="text-xs text-gray-700">
            Price is negotiable
          </label>
        </div>
      </motion.div>

      {/* Description Section */}
      <motion.div variants={staggerItem}>
        <label htmlFor="description" className="font-medium text-gray-900 text-base block mb-2">
          Description<span className="text-red-500 ml-1">*</span>
        </label>
        <motion.textarea
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          id="description"
          placeholder="Describe the item you're selling"
          className={`w-full border rounded-lg p-3 text-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 ${
            errors.description ? "border-red-300 bg-red-50" : "border-gray-200"
          }`}
        ></motion.textarea>
        {errors.description ? (
          <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
            <AlertCircle className="h-3 w-3 mt-0.5" />
            {errors.description}
          </p>
        ) : (
          <div className="flex items-start gap-2 mt-1.5 text-gray-500">
            <Info className="h-3.5 w-3.5 mt-0.5" />
            <p className="text-[10px]">
              Include details such as features, specifications and any other important information.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default FormStepTwo

