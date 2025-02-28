// frontend/src/components/FormStepThree.jsx
"use client"

import { motion } from "framer-motion";
import { MapPin, Smartphone, AlertCircle } from "lucide-react";
import { staggerContainer, staggerItem } from "./animations";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";

const FormStepThree = ({ formState, errors = {}, formData, setFormData }) => {
  const { selectedState, setSelectedState, cities, australianStates, category } = formState;
  const user = useSelector(selectUser);

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      {/* Area / Property Size Section */}
      <motion.div variants={staggerItem} className="mb-6">
        {category === "Property" ? (
          <div>
            <label htmlFor="propertyArea" className="font-medium text-gray-900 text-base block mb-2">
              Property Area (sq ft)
            </label>
            <div className="relative">
              <motion.input
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                id="propertyArea"
                type="number"
                placeholder="Enter property area"
                value={formData.propertyArea}
                onChange={(e) => setFormData({ ...formData, propertyArea: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-3 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">sq ft</span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </motion.div>

      {/* Location Section */}
      <motion.div variants={staggerItem} className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-4 w-4 text-gray-700" />
          <h3 className="font-medium text-gray-900 text-base">Location Details</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="state" className="font-medium text-gray-800 block mb-1.5 text-xs">
              State<span className="text-red-500 ml-1">*</span>
            </label>
            <motion.select
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              id="state"
              className={`w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 ${
                errors.state ? "border-red-300 bg-red-50" : "border-gray-200"
              }`}
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">Select state</option>
              {australianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </motion.select>
            {errors.state && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.state}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="city" className="font-medium text-gray-800 block mb-1.5 text-xs">
              City<span className="text-red-500 ml-1">*</span>
            </label>
            <motion.select
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              id="city"
              className={`w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 ${
                !selectedState
                  ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                  : errors.city
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200"
              }`}
              disabled={!selectedState}
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            >
              <option value="">{selectedState ? "Select city" : "Select state first"}</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </motion.select>
            {errors.city && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.city}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div variants={staggerItem}>
        <h3 className="font-medium text-gray-900 text-base mb-3 flex items-center gap-2">
          <Smartphone className="h-4 w-4" /> Contact Information
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="font-medium text-gray-800 block mb-1.5 text-xs">
              Name<span className="text-red-500 ml-1">*</span>
            </label>
            <motion.input
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              id="name"
              placeholder="Your name"
              defaultValue={user?.name || ''}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 ${
                errors.name ? "border-red-300 bg-red-50" : "border-gray-200"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.name}
              </p>
            )}
          </div>

          {/* <div>
            <label htmlFor="email" className="font-medium text-gray-800 block mb-1.5 text-xs">
              Email<span className="text-red-500 ml-1">*</span>
            </label>
            <motion.input
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              id="email"
              type="email"
              placeholder="Your email address"
              defaultValue={user?.email || ''}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 ${
                errors.email ? "border-red-300 bg-red-50" : "border-gray-200"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.email}
              </p>
            )}
          </div> */}

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-medium text-gray-800 text-xs">Your phone number</label>
              <span className="text-xs text-gray-500">+61 XXX XXX XXX</span>
            </div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <label htmlFor="show-phone" className="text-xs cursor-pointer flex items-center gap-2">
                <span>Show my phone number in ads</span>
                <div className="text-[10px] text-gray-500">(Recommended)</div>
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input id="show-phone" type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
              </label>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FormStepThree;
