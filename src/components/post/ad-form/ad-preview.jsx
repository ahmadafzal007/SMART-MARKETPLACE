"use client"

import { motion } from "framer-motion"
import { ImageIcon } from "lucide-react"

const AdPreview = ({ formState, formData }) => {
  const { images, selectedState, cities } = formState
  const { title, price, city } = formData

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      className="bg-white rounded-sm shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="bg-black text-white p-3 relative">
        <h3 className="font-medium text-center text-sm tracking-wide">Ad Preview</h3>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-white/20 rounded-full"></div>
      </div>
      <div className="p-3">
        <div className="aspect-video bg-gray-100 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
          {images.length > 0 ? (
            <motion.img
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              src={images[0] || "/placeholder.svg"}
              alt="Ad preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-400 p-6">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <ImageIcon className="h-6 w-6 mb-1.5" />
              </motion.div>
              <span className="text-[10px] font-medium">No image uploaded</span>
            </div>
          )}
        </div>
        <div className="space-y-1.5">
          <h4 className="font-medium truncate text-sm leading-tight">
            {title || "Your ad title will appear here"}
          </h4>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 truncate max-w-[70%]">
              {selectedState ? `${selectedState}` : "Location"}
              {cities.length > 0 ? `, ${city || "City"}` : ""}
            </span>
            <span className="font-medium tabular-nums">${price || "0"}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AdPreview

