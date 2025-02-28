"use client"

import { motion } from "framer-motion"
import { Sparkles, Zap, Shield } from "lucide-react"

const TipsSection = () => {
  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.6 + i * 0.1 },
    }),
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        className="bg-white rounded-sm shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <div className="bg-gradient-to-r from-gray-800 to-black text-white p-3 relative">
          <h3 className="font-medium flex items-center gap-1.5 text-sm">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
            >
              <Sparkles className="h-3.5 w-3.5" />
            </motion.div>
            <span className="tracking-wide">Tips for Success</span>
          </h3>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        <div className="p-3">
          <ul className="space-y-2.5 text-xs">
            <motion.li
              custom={0}
              initial="hidden"
              animate="visible"
              variants={listItemVariants}
              className="flex items-start gap-1.5 group"
            >
              <Zap className="h-3.5 w-3.5 text-black mt-0.5 flex-shrink-0 group-hover:text-gray-600 transition-colors" />
              <span className="leading-tight">Use high-quality images to attract more buyers</span>
            </motion.li>
            <motion.li
              custom={1}
              initial="hidden"
              animate="visible"
              variants={listItemVariants}
              className="flex items-start gap-1.5 group"
            >
              <Zap className="h-3.5 w-3.5 text-black mt-0.5 flex-shrink-0 group-hover:text-gray-600 transition-colors" />
              <span className="leading-tight">Be detailed in your description to reduce questions</span>
            </motion.li>
            <motion.li
              custom={2}
              initial="hidden"
              animate="visible"
              variants={listItemVariants}
              className="flex items-start gap-1.5 group"
            >
              <Zap className="h-3.5 w-3.5 text-black mt-0.5 flex-shrink-0 group-hover:text-gray-600 transition-colors" />
              <span className="leading-tight">Respond quickly to inquiries to increase chances of selling</span>
            </motion.li>
          </ul>
        </div>
      </motion.div>

      {/* Safety Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, ease: "easeOut" }}
        className="bg-gray-50 rounded-sm p-3 border border-gray-200 hover:border-gray-300 transition-colors duration-300"
      >
        <h3 className="font-medium flex items-center gap-1.5 text-gray-900 mb-2 text-sm">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
          >
            <Shield className="h-3.5 w-3.5" />
          </motion.div>
          <span className="tracking-wide">Safety Tips</span>
        </h3>
        <ul className="space-y-2 text-xs text-gray-700">
          <li className="flex items-start gap-1.5 group">
            <div className="w-1 h-1 rounded-full bg-gray-700 mt-1.5 group-hover:bg-gray-900 transition-colors"></div>
            <span className="leading-tight">Meet in public places for transactions</span>
          </li>
          <li className="flex items-start gap-1.5 group">
            <div className="w-1 h-1 rounded-full bg-gray-700 mt-1.5 group-hover:bg-gray-900 transition-colors"></div>
            <span className="leading-tight">Verify buyer/seller identity before meeting</span>
          </li>
        </ul>
      </motion.div>
    </>
  )
}

export default TipsSection

