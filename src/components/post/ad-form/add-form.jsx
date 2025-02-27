import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "../nav"
import { CheckCircle2 } from 'lucide-react'
import FormStepIndicator from "./form-step-indicator"
import FormStepOne from "./form-step-one"
import FormStepTwo from "./form-step-two"
import FormStepThree from "./form-step-three"
import AdPreview from "./ad-preview"
import TipsSection from "./tips-section"
import { useFormState } from "./use-form-state"
import { fadeIn } from "./animations"

const AdForm = ({ category = "Electronics", subcategory = "Smartphones" }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formComplete, setFormComplete] = useState(false)
  const [errors, setErrors] = useState({})
  const formRef = useRef(null)
  const containerRef = useRef(null)

  const formState = useFormState(category, subcategory)
  
  // Validation functions for each step
  const validateStepOne = () => {
    const newErrors = {}
    
    // Check if title is filled
    const titleInput = formRef.current.querySelector('#title')
    if (!titleInput || !titleInput.value.trim()) {
      newErrors.title = "Title is required"
    }
    
    // Check if at least one image is uploaded
    if (formState.images.length === 0) {
      newErrors.images = "At least one image is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const validateStepTwo = () => {
    const newErrors = {}
    
    // Check if price is filled
    const priceInput = formRef.current.querySelector('#price')
    if (!priceInput || !priceInput.value.trim() || isNaN(parseFloat(priceInput.value))) {
      newErrors.price = "Valid price is required"
    }
    
    // Check if description is filled
    const descriptionInput = formRef.current.querySelector('#description')
    if (!descriptionInput || !descriptionInput.value.trim()) {
      newErrors.description = "Description is required"
    }
    
    // Check if brand is selected (if applicable)
    if (formState.showBrandModel) {
      const brandSelect = formRef.current.querySelector('#brand')
      if (!brandSelect || !brandSelect.value) {
        newErrors.brand = "Brand selection is required"
      }
    }
    
    // Check if condition is selected (if applicable)
    if (formState.category !== "Property") {
      const conditionInputs = formRef.current.querySelectorAll('input[name="condition"]')
      let conditionSelected = false
      conditionInputs.forEach(input => {
        if (input.checked) conditionSelected = true
      })
      
      if (!conditionSelected) {
        newErrors.condition = "Condition selection is required"
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const validateStepThree = () => {
    const newErrors = {}
    
    // Check if state is selected
    if (!formState.selectedState) {
      newErrors.state = "State selection is required"
    }
    
    // Check if city is selected
    const citySelect = formRef.current.querySelector('#city')
    if (!citySelect || !citySelect.value) {
      newErrors.city = "City selection is required"
    }
    
    // Check if name is filled
    const nameInput = formRef.current.querySelector('#name')
    if (!nameInput || !nameInput.value.trim()) {
      newErrors.name = "Name is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Navigation handlers
  const nextStep = () => {
    let isValid = false
    
    if (currentStep === 1) {
      isValid = validateStepOne()
    } else if (currentStep === 2) {
      isValid = validateStepTwo()
    }
    
    if (isValid && currentStep < 3) {
      if (containerRef.current) {
        containerRef.current.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      setCurrentStep((prev) => prev + 1)
      setErrors({})
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      if (containerRef.current) {
        containerRef.current.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      setCurrentStep((prev) => prev - 1)
      setErrors({})
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // If not on final step, simply advance with validation
    if (currentStep < 3) {
      nextStep()
    } else {
      // Final submission logic for step 3 with validation
      const isValid = validateStepThree()
      
      if (isValid) {
        setFormComplete(true)
        console.log("Form submitted")
        // Your final submission logic here.
      }
    }
  }

  // Clear errors when changing steps
  useEffect(() => {
    setErrors({})
  }, [])

  if (formComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        <SuccessMessage setFormComplete={setFormComplete} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <div className="max-w-8xl mx-auto p-4 md:p-6">
        <FormStepIndicator currentStep={currentStep} setCurrentStep={setCurrentStep} />

        <div className="grid md:grid-cols-[1fr_320px] gap-5">
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            // Prevent accidental submission via Enter on steps 1 & 2.
            onKeyDown={(e) => {
              if (e.key === "Enter" && currentStep < 3) {
                e.preventDefault()
              }
            }}
            className="bg-white shadow-lg rounded-sm overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-black via-gray-800 to-black text-white p-5">
              <h2 className="text-lg md:text-xl font-bold text-center">POST YOUR AD</h2>
              <p className="text-center text-white/80 text-xs mt-1">
                Fill in the details to create your listing
              </p>
            </div>

            <div className="divide-y divide-gray-100" ref={containerRef}>
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeIn}
                    className="p-5 space-y-6 max-h-[70vh] overflow-y-auto"
                  >
                    <FormStepOne formState={formState} errors={errors} />
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeIn}
                    className="p-5 space-y-6 max-h-[70vh] overflow-y-auto"
                  >
                    <FormStepTwo formState={formState} errors={errors} />
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeIn}
                    className="p-5 space-y-6 max-h-[70vh] overflow-y-auto"
                  >
                    <FormStepThree formState={formState} errors={errors} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Error Summary */}
            {Object.keys(errors).length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="px-5 py-3 bg-red-50 border-t border-red-100"
              >
                <ul className="text-xs text-red-500 list-disc pl-5">
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="p-5 bg-gray-50 flex justify-between items-center border-t border-gray-100">
              {currentStep > 1 ? (
                <NavigationButton onClick={prevStep} type="back" />
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <NavigationButton onClick={nextStep} type="next" />
              ) : (
                // On step 3, the button is of type "submit" so the form onSubmit handles submission.
                <NavigationButton type="submit" />
              )}
            </div>
          </motion.form>

          {/* Right Sidebar */}
          <div className="hidden md:flex flex-col space-y-5">
            <AdPreview formState={formState} />
            <TipsSection />
          </div>
        </div>
      </div>
    </div>
  )
}

const SuccessMessage = ({ setFormComplete }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, type: "spring" }}
    className="max-w-md mx-auto mt-16 p-8 bg-white rounded-sm shadow-lg text-center"
  >
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.3,
      }}
      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
    >
      <CheckCircle2 className="h-10 w-10 text-green-600" />
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="text-2xl font-bold text-gray-800 mb-3"
    >
      Ad Posted Successfully!
    </motion.h2>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="text-gray-600 mb-6 text-sm"
    >
      Your ad has been submitted and will be live shortly. You'll receive a confirmation email with details.
    </motion.p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <ActionButton
        delay={0.9}
        onClick={() => setFormComplete(false)}
        primary
        icon="plus"
        text="Post Another Ad"
      />
      <ActionButton delay={1.1} icon="eye" text="View My Ads" />
    </div>
  </motion.div>
)

const NavigationButton = ({ onClick, type }) => {
  const buttonProps = {
    back: {
      text: "Back",
      icon: "chevron-left",
      className:
        "px-4 py-2 border border-gray-200 rounded-lg text-gray-800 text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-1",
    },
    next: {
      text: "Next",
      icon: "chevron-right",
      className:
        "px-4 py-2 bg-black hover:bg-black/90 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-1 shadow-md",
    },
    submit: {
      text: "Post Ad Now",
      icon: "arrow-right",
      className:
        "px-4 py-2 bg-black hover:bg-black/90 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-1 group shadow-md",
    },
  }

  const { text, icon, className } = buttonProps[type]

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      type={type === "submit" ? "submit" : "button"}
      onClick={onClick}
      className={className}
    >
      {type === "back" && <span className="h-3.5 w-3.5">←</span>}
      {text}
      {type !== "back" && (
        <span className={`h-3.5 w-3.5 ${type === "submit" ? "group-hover:translate-x-1 transition-transform" : ""}`}>
          →
        </span>
      )}
    </motion.button>
  )
}

const ActionButton = ({ delay, onClick, primary, icon, text }) => (
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`px-5 py-2.5 ${
      primary
        ? "bg-black text-white shadow-md hover:shadow-lg"
        : "bg-white text-black border border-gray-200 hover:shadow-sm"
    } rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2`}
  >
    <span className="h-4 w-4">
      {icon === "plus" ? "+" : icon === "eye" ? "👁️" : ""}
    </span>
    {text}
  </motion.button>
)

export default AdForm
