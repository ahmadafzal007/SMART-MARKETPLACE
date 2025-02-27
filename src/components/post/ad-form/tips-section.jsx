"use client"

import { motion } from "framer-motion"
import { Sparkles, Zap, Shield, Bookmark } from "lucide-react"

const TipsSection = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-sm shadow-md border border-gray-100 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-gray-800 to-black text-white p-3">
          <h3 className="font-medium flex items-center gap-1.5 text-sm">
            <Sparkles className="h-3.5 w-3.5" /> Tips for Success
          </h3>
        </div>
        <div className="p-3">
          <ul className="space-y-2 text-xs">
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-start gap-1.5"
            >
              <Zap className="h-3.5 w-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
              <span>Use high-quality images to attract more buyers</span>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-start gap-1.5"
            >
              <Zap className="h-3.5 w-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
              <span>Be detailed in your description to reduce questions</span>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-start gap-1.5"
            >
              <Zap className="h-3.5 w-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
              <span>Respond quickly to inquiries to increase chances of selling</span>
            </motion.li>
          </ul>
        </div>
      </motion.div>

      {/* Safety Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-blue-50 rounded-sm p-3 border border-blue-100"
      >
        <h3 className="font-medium flex items-center gap-1.5 text-blue-800 mb-1.5 text-sm">
          <Shield className="h-3.5 w-3.5" /> Safety Tips
        </h3>
        <ul className="space-y-1.5 text-xs text-blue-700">
          <li className="flex items-start gap-1.5">
            <div className="w-1 h-1 rounded-full bg-blue-700 mt-1.5"></div>
            <span>Meet in public places for transactions</span>
          </li>
          <li className="flex items-start gap-1.5">
            <div className="w-1 h-1 rounded-full bg-blue-700 mt-1.5"></div>
            <span>Verify buyer/seller identity before meeting</span>
          </li>
        </ul>
      </motion.div>

    </>
  )
}

export default TipsSection

