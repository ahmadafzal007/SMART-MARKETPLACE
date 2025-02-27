import { motion } from "framer-motion"
import { ImageIcon } from "lucide-react"

const AdPreview = ({ formState }) => {
  const { images, selectedState, cities } = formState

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-sm shadow-md border border-gray-100 overflow-hidden"
    >
      <div className="bg-black text-white p-3">
        <h3 className="font-medium text-center text-sm">Ad Preview</h3>
      </div>
      <div className="p-3">
        <div className="aspect-video bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
          {images.length > 0 ? (
            <img
              src={images[0] || "/placeholder.svg"}
              alt="Ad preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <ImageIcon className="h-6 w-6 mb-1" />
              <span className="text-[10px]">No image uploaded</span>
            </div>
          )}
        </div>
        <div className="space-y-1.5">
          <h4 className="font-medium truncate text-sm">
            {document.getElementById("title")?.value || "Your ad title will appear here"}
          </h4>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">
              {selectedState ? `${selectedState}` : "Location"}
              {cities.length > 0 ? `, ${document.getElementById("city")?.value || "City"}` : ""}
            </span>
            <span className="font-medium">${document.getElementById("price")?.value || "0"}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AdPreview

