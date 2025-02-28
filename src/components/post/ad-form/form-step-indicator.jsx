"use client"

import { motion } from "framer-motion"
import { Sparkles, AlertCircle } from "lucide-react"
import { pulseAnimation } from "./animations"

const FormStepIndicator = ({ currentStep, setCurrentStep, validateStep }) => {
  const handleStepChange = (step) => {
    // Only allow moving forward if current step is validated
    if (step > currentStep && !validateStep(currentStep)) {
      return;
    }
    // Allow moving backward freely
    if (step < currentStep) {
      setCurrentStep(step);
      return;
    }
    // For moving forward, validate current step
    if (validateStep(currentStep)) {
      setCurrentStep(step);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <div className="flex flex-col md:flex-row md:justify-end md:items-center mb-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-600">Step {currentStep} of 3</span>
          <div className="hidden md:flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <motion.button
                key={step}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleStepChange(step)}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all text-xs ${
                  currentStep >= step ? "bg-black text-white" : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                }`}
              >
                {step}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
        <motion.div
          initial={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          animate={{ width: `${(currentStep / 3) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-black h-2 rounded-full"
        ></motion.div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 md:hidden">
        <div 
          className={`flex flex-col items-center ${currentStep >= 1 ? "text-black font-medium" : ""}`}
          onClick={() => handleStepChange(1)}
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center mb-1 ${currentStep >= 1 ? "bg-black text-white" : "bg-gray-200"}`}
          >
            1
          </div>
          <span>Overview</span>
        </div>
        <div 
          className={`flex flex-col items-center ${currentStep >= 2 ? "text-black font-medium" : ""}`}
          onClick={() => handleStepChange(2)}
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center mb-1 ${currentStep >= 2 ? "bg-black text-white" : "bg-gray-200"}`}
          >
            2
          </div>
          <span>Details</span>
        </div>
        <div 
          className={`flex flex-col items-center ${currentStep >= 3 ? "text-black font-medium" : ""}`}
          onClick={() => handleStepChange(3)}
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center mb-1 ${currentStep >= 3 ? "bg-black text-white" : "bg-gray-200"}`}
          >
            3
          </div>
          <span>Location</span>
        </div>
      </div>
    </motion.div>
  )
}

export default FormStepIndicator

