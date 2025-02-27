"use client"

import { useState, useEffect } from "react"
import formData from "../../../json/formData.json"

export const useFormState = (category, subcategory) => {
  // State variables
  const [selectedState, setSelectedState] = useState("")
  const [cities, setCities] = useState([])
  const [images, setImages] = useState([])
  const [listingType, setListingType] = useState("sell")
  const [rentType, setRentType] = useState("monthly")
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showTips, setShowTips] = useState(true)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // Cloudinary config (update with your own values)
  const cloudName = "dj3p3xvrj"
  const uploadPreset = "kmzzjyam"

  // Get data from imported JSON
  const { australianStates, citiesByState, areas, brandsByCategory } = formData

  // Update cities when state changes
  useEffect(() => {
    if (selectedState && citiesByState[selectedState]) {
      setCities(citiesByState[selectedState])
    } else {
      setCities([])
    }
  }, [selectedState, citiesByState])

  // Simulate upload progress
  useEffect(() => {
    if (uploading) {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval)
            return prev
          }
          return prev + 5
        })
      }, 100)

      return () => clearInterval(interval)
    } else {
      setUploadProgress(0)
    }
  }, [uploading])

  // Helper functions
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (images.length >= 8) return

    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", uploadPreset)

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (data.secure_url) {
        setImages((prev) => [...prev, data.secure_url])
      }
    } catch (error) {
      console.error("Image upload failed", error)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const getBrands = () => {
    if (
      (category === "Electronics" || category === "Vehicles") &&
      brandsByCategory[category] &&
      brandsByCategory[category][subcategory]
    ) {
      return brandsByCategory[category][subcategory]
    }
    return []
  }

  const getCategoryIcon = () => {
    switch (category) {
      case "Electronics":
        return "smartphone"
      case "Vehicles":
        return "car"
      case "Property":
        return "home"
      case "Home Decor":
        return "sofa"
      default:
        return "tag"
    }
  }

  const showBrandModel = category === "Electronics" || category === "Vehicles"
  const showRentSellOption = category === "Vehicles" || category === "Property"

  return {
    selectedState,
    setSelectedState,
    cities,
    setCities,
    images,
    setImages,
    listingType,
    setListingType,
    rentType,
    setRentType,
    uploading,
    uploadProgress,
    showTips,
    setShowTips,
    activeImageIndex,
    setActiveImageIndex,
    australianStates,
    handleImageUpload,
    removeImage,
    getBrands,
    getCategoryIcon,
    showBrandModel,
    showRentSellOption,
    category,
    subcategory,
  }
}

