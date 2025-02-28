// frontend/src/components/FormStepOne.jsx
"use client"

import { useRef } from "react";
import { motion } from "framer-motion";
import { Camera, AlertCircle, X, Upload, Loader2, Info } from "lucide-react";
import { staggerItem } from "./animations";

const FormStepOne = ({ formState, errors = {}, formData, setFormData }) => {
  const {
    images,
    uploading,
    uploadProgress,
    activeImageIndex,
    setActiveImageIndex,
    handleImageUpload,
    removeImage,
    getCategoryIcon,
    category,
    subcategory,
  } = formState;

  const fileInputRef = useRef(null);

  return (
    <>
      {/* Category Section */}
      <motion.div variants={staggerItem} className="group">
        <div className="flex justify-between items-center">
          <label className="font-medium text-gray-900 text-base">Category</label>
        </div>
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex items-center mt-2 gap-3 p-4 bg-gray-50 rounded-md border border-gray-200 hover:border-black hover:shadow-sm transition-all duration-300"
        >
          <motion.div whileHover={{ rotate: 10 }} className="bg-black/5 p-3 rounded-full">
            <div className="text-black">
              {getCategoryIcon() === "smartphone" && <span className="text-sm">📱</span>}
              {getCategoryIcon() === "car" && <span className="text-sm">🚗</span>}
              {getCategoryIcon() === "home" && <span className="text-sm">🏠</span>}
              {getCategoryIcon() === "sofa" && <span className="text-sm">🛋️</span>}
              {getCategoryIcon() === "tag" && <span className="text-sm">🏷️</span>}
            </div>
          </motion.div>
          <div>
            <div className="font-medium text-gray-900 text-sm">{category}</div>
            <div className="text-xs text-gray-500">{subcategory}</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Image Upload Section */}
      <motion.div variants={staggerItem}>
        <div className="flex justify-between items-center mb-2">
          <label className="font-medium text-gray-900 text-base flex items-center gap-2">
            <Camera className="h-4 w-4 text-gray-700" /> Upload Images
            <span className="text-red-500">*</span>
          </label>
          <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 rounded-full text-gray-700">
            {images.length}/8 photos
          </span>
        </div>

        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 relative rounded-md overflow-hidden aspect-video bg-gray-100"
          >
            <img
              src={images[activeImageIndex] || "/placeholder.svg"}
              alt="Active preview"
              className="object-contain w-full h-full"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-2 flex justify-between items-center">
              <div className="text-white text-xs font-medium">
                {activeImageIndex === 0 ? "Cover Image" : `Image ${activeImageIndex + 1}`}
              </div>
              <button
                type="button"
                onClick={() => removeImage(activeImageIndex)}
                className="bg-white/20 backdrop-blur-sm rounded-full p-1 hover:bg-red-500 transition-colors"
              >
                <X className="h-3.5 w-3.5 text-white" />
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-2 mt-2">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`relative border rounded-md h-14 flex items-center justify-center group overflow-hidden cursor-pointer ${
                activeImageIndex === index ? "ring-2 ring-black" : ""
              }`}
              onClick={() => setActiveImageIndex(index)}
            >
              <img
                src={img || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-110"
              />
              {index === 0 && (
                <span className="absolute  top-0.5 left-0.5 bg-black text-white text-[8px] px-1 py-0.5 rounded">
                  Cover
                </span>
              )}
            </motion.div>
          ))}
          {images.length < 8 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-md h-24 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition-all duration-300 group ${
                errors.images ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-black"
              }`}
            >
              {uploading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="h-5 w-5 mb-1 text-black/70 animate-spin" />
                  <div className="w-10 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-black rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                </div>
              ) : (
                <>
                  <Upload
                    className={`h-4 w-4 mb-0.5 group-hover:scale-110 transition-transform duration-300 ${
                      errors.images ? "text-red-500" : "text-black/70"
                    }`}
                  />
                  <span className={`text-[9px] font-medium ${errors.images ? "text-red-500" : ""}`}>
                    {errors.images ? "Required" : "Add"}
                  </span>
                </>
              )}
            </motion.button>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </div>

        {errors.images && (
          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.images}
          </p>
        )}
      </motion.div>

      {/* Ad Title Section */}
      <motion.div variants={staggerItem}>
        <label htmlFor="title" className="font-medium text-gray-900 text-base block mb-2">
          Ad Title<span className="text-red-500 ml-1">*</span>
        </label>
        <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <input
            id="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`w-full border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 ${
              errors.title ? "border-red-300 bg-red-50" : "border-gray-200"
            }`}
          />
        </motion.div>
        {errors.title ? (
          <p className="text-red-500 text-xs mt-1.5 flex items-start gap-1">
            <AlertCircle className="h-3 w-3 mt-0.5" />
            {errors.title}
          </p>
        ) : (
          <p className="text-[10px] text-gray-500 mt-1.5 flex items-start gap-1">
            <Info className="h-3 w-3 mt-0.5" />
            Mention key features (e.g. brand, model, age, type)
          </p>
        )}
      </motion.div>
    </>
  );
};

export default FormStepOne;
