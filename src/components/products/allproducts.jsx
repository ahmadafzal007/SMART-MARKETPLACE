"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import { filterProducts } from "../../api/filterProductsApi"
import HorizontalProductCard from "./horizontalProductCard"
import { ChevronDown, X, SlidersHorizontal, ArrowUpDown } from "lucide-react"

const AllProducts = () => {
  const { category } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(Number.parseInt(searchParams.get("page") || "1", 10))
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef()

  // Product state
  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState({
    currentPage: currentPage,
    totalPages: 1,
    totalItems: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [likedItems, setLikedItems] = useState(new Set())

  // Filter state
  const [filters, setFilters] = useState({
    category: category || "",
    subcategory: searchParams.get("subcategory") || "",
    state: searchParams.get("state") || "",
    city: searchParams.get("city") || "",
    listingType: searchParams.get("listingType") ? [searchParams.get("listingType")] : [],
    rentType: searchParams.get("rentType") ? [searchParams.get("rentType")] : [],
    minPrice: searchParams.get("minPrice") || "0",
    maxPrice: searchParams.get("maxPrice") || "100000000",
    location: searchParams.get("location") || "",
    sort: searchParams.get("sort") || "newest",
  })

  const [showFilters, setShowFilters] = useState(false)
  const [availableSubcategories, setAvailableSubcategories] = useState([])
  const [isFilterApplied, setIsFilterApplied] = useState(false)

  // Reference data
  const categories = {
    Electronics: [
      "Smartphones",
      "Laptops",
      "Tablets",
      "TVs & Audio",
      "Cameras",
      "Smart Watches",
      "Accessories",
      "Gaming",
      "Computer Parts",
    ],
    Vehicles: [
      "Cars",
      "Motorcycles",
      "Bikes",
      "Spare Parts",
      "Commercial Vehicles",
      "Boats",
      "Automotive Tools",
      "Rentals",
    ],
    "Home Decor": [
      "Furniture",
      "Lighting",
      "Rugs & Carpets",
      "Wall Decor",
      "Home Textiles",
      "Kitchen & Dining",
      "Bath",
      "Home Accessories",
    ],
    Property: ["Houses", "Apartments", "Plots", "Commercial", "Shops", "Offices", "Agricultural Land", "Industrial"],
  }

  const australianStates = [
    "New South Wales",
    "Victoria",
    "Queensland",
    "Western Australia",
    "South Australia",
    "Tasmania",
    "Australian Capital Territory",
    "Northern Territory",
  ]

  const listingTypes = ["sell", "rent"]
  const rentTypes = ["Daily", "Weekly", "Monthly"]
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
  ]

  const citiesByState = {
    "New South Wales": ["Sydney", "Newcastle", "Wollongong", "Central Coast"],
    Victoria: ["Melbourne", "Geelong", "Ballarat", "Bendigo"],
    Queensland: ["Brisbane", "Gold Coast", "Sunshine Coast", "Townsville"],
    "Western Australia": ["Perth", "Fremantle", "Mandurah", "Bunbury"],
    "South Australia": ["Adelaide", "Mount Gambier", "Whyalla", "Port Lincoln"],
    Tasmania: ["Hobart", "Launceston", "Devonport", "Burnie"],
    "Australian Capital Territory": ["Canberra", "Belconnen", "Tuggeranong", "Gungahlin"],
    "Northern Territory": ["Darwin", "Alice Springs", "Katherine", "Nhulunbuy"],
  }

  // Helper function to compute relative time (e.g., "2 days ago")
  const timeAgo = useCallback((date) => {
    const seconds = Math.floor((new Date() - date) / 1000)
    let interval = Math.floor(seconds / 31536000)
    if (interval >= 1) {
      return interval + " year" + (interval > 1 ? "s" : "") + " ago"
    }
    interval = Math.floor(seconds / 2592000)
    if (interval >= 1) {
      return interval + " month" + (interval > 1 ? "s" : "") + " ago"
    }
    interval = Math.floor(seconds / 86400)
    if (interval >= 1) {
      return interval + " day" + (interval > 1 ? "s" : "") + " ago"
    }
    interval = Math.floor(seconds / 3600)
    if (interval >= 1) {
      return interval + " hour" + (interval > 1 ? "s" : "") + " ago"
    }
    interval = Math.floor(seconds / 60)
    if (interval >= 1) {
      return interval + " minute" + (interval > 1 ? "s" : "") + " ago"
    }
    return Math.floor(seconds) + " seconds ago"
  }, [])

  // Update subcategories when category changes
  useEffect(() => {
    if (filters.category && categories[filters.category]) {
      setAvailableSubcategories(categories[filters.category])
    } else {
      setAvailableSubcategories([])
    }
  }, [filters.category])

  // Last element ref callback for infinite scrolling
  const lastProductElementRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore],
  )

  // Check if any filter is applied
  useEffect(() => {
    const hasActiveFilter =
      filters.subcategory !== "" ||
      filters.state !== "" ||
      filters.city !== "" ||
      filters.listingType.length > 0 ||
      filters.rentType.length > 0 ||
      filters.minPrice !== "0" ||
      filters.maxPrice !== "100000000" ||
      filters.location !== "" ||
      filters.sort !== "newest"

    setIsFilterApplied(hasActiveFilter)
  }, [filters])

  // Load products based on filters
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        // Prepare filter parameters for API
        const filterParams = {
          page: currentPage,
          limit: 20,
          ...(filters.category && { category: filters.category }),
          ...(filters.subcategory && { subcategory: filters.subcategory }),
          ...(filters.state && { state: filters.state }),
          ...(filters.city && { city: filters.city }),
          ...(filters.minPrice && { minPrice: filters.minPrice }),
          ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
          ...(filters.location && { location: filters.location }),
          ...(filters.sort && { sort: filters.sort }),
        }

        // Add array parameters
        if (filters.listingType.length > 0) {
          filterParams.listingType = filters.listingType
        }

        if (filters.rentType.length > 0) {
          filterParams.rentType = filters.rentType
        }

        // Use the filter API instead of category-specific API
        const data = await filterProducts(filterParams)

        if (!data.products || !Array.isArray(data.products)) {
          throw new Error("Invalid response format")
        }

        // Transform the data
        const transformedProducts = data.products.map((product) => ({
          id: product._id,
          image: product.images[0],
          title: product.title,
          price: product.price,
          listingType: product.listingType,
          rentType: product.rentType,
          location: `${product.city}, ${product.state}`,
          time: timeAgo(new Date(product.createdAt)),
        }))

        setProducts((prev) => (currentPage === 1 ? transformedProducts : [...prev, ...transformedProducts]))
        setPagination(data.pagination)
        setHasMore(currentPage < data.pagination.totalPages)
      } catch (err) {
        console.error("Failed to load products:", err)
        setError("Failed to load products. Please try again later.")
        if (currentPage === 1) {
          setProducts([])
          setPagination({
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
          })
        }
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [currentPage, filters, timeAgo])

  // Update URL search params when filters change
  useEffect(() => {
    const newSearchParams = new URLSearchParams()

    // Add all non-empty filters to URL
    newSearchParams.set("page", currentPage.toString())
    if (filters.subcategory) newSearchParams.set("subcategory", filters.subcategory)
    if (filters.state) newSearchParams.set("state", filters.state)
    if (filters.city) newSearchParams.set("city", filters.city)
    if (filters.minPrice) newSearchParams.set("minPrice", filters.minPrice)
    if (filters.maxPrice) newSearchParams.set("maxPrice", filters.maxPrice)
    if (filters.location) newSearchParams.set("location", filters.location)
    if (filters.sort) newSearchParams.set("sort", filters.sort)

    // Handle array parameters
    if (filters.listingType.length === 1) {
      newSearchParams.set("listingType", filters.listingType[0])
    }

    if (filters.rentType.length === 1) {
      newSearchParams.set("rentType", filters.rentType[0])
    }

    setSearchParams(newSearchParams)
  }, [filters, currentPage, setSearchParams])

  const toggleLike = (itemTitle) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemTitle)) {
        newSet.delete(itemTitle)
      } else {
        newSet.add(itemTitle)
      }
      return newSet
    })
  }

  const formatCategoryName = (name) => {
    if (!name) return ""
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  }

  const handleFilterChange = (filterName, value) => {
    // Reset to page 1 when filters change
    if (currentPage !== 1) {
      setCurrentPage(1)
    }

    setFilters((prev) => {
      // Special handling for array filters (listingType, rentType)
      if (filterName === "listingType") {
        const currentValues = [...prev[filterName]]
        const valueIndex = currentValues.indexOf(value)

        if (valueIndex === -1) {
          currentValues.push(value)
        } else {
          currentValues.splice(valueIndex, 1)
        }

        // Clear rentType if 'rent' is deselected
        if (value === 'rent' && valueIndex !== -1) {
          return {
            ...prev,
            listingType: currentValues,
            rentType: [] // Clear rentType when rent is deselected
          }
        }

        return {
          ...prev,
          [filterName]: currentValues,
        }
      }

      if (filterName === "rentType") {
        const currentValues = [...prev[filterName]]
        const valueIndex = currentValues.indexOf(value)

        if (valueIndex === -1) {
          currentValues.push(value)
        } else {
          currentValues.splice(valueIndex, 1)
        }

        return {
          ...prev,
          [filterName]: currentValues,
        }
      }

      // Special handling for category changes
      if (filterName === "category" && value !== prev.category) {
        // Reset subcategory when category changes
        return {
          ...prev,
          category: value,
          subcategory: "",
        }
      }

      // Special handling for state changes
      if (filterName === "state" && value !== prev.state) {
        return {
          ...prev,
          state: value,
          city: "", // Reset city when state changes
        }
      }

      // Default handling for other filters
      return {
        ...prev,
        [filterName]: value,
      }
    })
  }

  const clearAllFilters = () => {
    setFilters({
      ...filters,
      subcategory: "",
      state: "",
      city: "",
      listingType: [],
      rentType: [],
      minPrice: "0",
      maxPrice: "100000000",
      location: "",
      sort: "newest",
    })
    setCurrentPage(1)
  }

  const clearFilter = (filterName) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: filterName === "listingType" || filterName === "rentType" ? [] : "",
    }))
    setCurrentPage(1)
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 font-['Plus_Jakarta_Sans']">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight font-['Inter']">
          {filters.category || formatCategoryName(category)}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Browse all {(filters.category || formatCategoryName(category)).toLowerCase()} listings
          {!loading && products.length > 0 && ` (${pagination.totalItems} items)`}
        </p>
      </div>

      {/* Filter controls - Mobile toggle */}
      <div className="lg:hidden flex justify-between items-center mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
          {isFilterApplied && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
        </button>

        <div className="relative">
          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ArrowUpDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Main content with filters */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters sidebar - Desktop always visible, mobile conditional */}
        <div className={`lg:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sticky top-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Filters</h3>
              {isFilterApplied && (
                <button 
                  onClick={clearAllFilters} 
                  className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Category filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <div className="relative">
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                  className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {Object.keys(categories).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subcategory filter - only show if category is selected */}
            {filters.category && availableSubcategories.length > 0 && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                  {filters.subcategory && (
                    <button
                      onClick={() => clearFilter("subcategory")}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="relative">
                  <select
                    value={filters.subcategory}
                    onChange={(e) => handleFilterChange("subcategory", e.target.value)}
                    className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">All Subcategories</option>
                    {availableSubcategories.map((subcat) => (
                      <option key={subcat} value={subcat}>
                        {subcat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* State filter */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">State</label>
                {filters.state && (
                  <button onClick={() => clearFilter("state")} className="text-xs text-gray-500 hover:text-gray-700">
                    Clear
                  </button>
                )}
              </div>
              <div className="relative">
                <select
                  value={filters.state}
                  onChange={(e) => handleFilterChange("state", e.target.value)}
                  className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">All States</option>
                  {australianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* City filter - only show if state is selected */}
            {filters.state && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  {filters.city && (
                    <button onClick={() => clearFilter("city")} className="text-xs text-gray-500 hover:text-gray-700">
                      Clear
                    </button>
                  )}
                </div>
                <div className="relative">
                  <select
                    value={filters.city}
                    onChange={(e) => handleFilterChange("city", e.target.value)}
                    className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">All Cities</option>
                    {citiesByState[filters.state]?.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Price range */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Price Range</label>
                {(filters.minPrice || filters.maxPrice) && (
                  <button
                    onClick={() => {
                      clearFilter("minPrice")
                      clearFilter("maxPrice")
                    }}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                  placeholder="Min"
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                  placeholder="Max"
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Listing Type */}
            {filters.category !== "Home Decor" && filters.category !== "Electronics" && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">Listing Type</label>
                  {filters.listingType.length > 0 && (
                    <button
                      onClick={() => clearFilter("listingType")}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {listingTypes.map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.listingType.includes(type)}
                        onChange={() => handleFilterChange("listingType", type)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Rent Type - only show if "Rent" is selected in listing type */}
            {filters.listingType.includes("rent") && filters.category !== "Home Decor" && filters.category !== "Electronics" && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">Rent Type</label>
                  {filters.rentType.length > 0 && (
                    <button
                      onClick={() => clearFilter("rentType")}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {rentTypes.map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.rentType.includes(type)}
                        onChange={() => handleFilterChange("rentType", type)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Sort options - Desktop only */}
            <div className="hidden lg:block">
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <div className="relative">
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange("sort", e.target.value)}
                  className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Active filters display */}
        <div className="flex-1">
          {isFilterApplied && (
            <div className="mb-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-500">Active filters:</span>

              {filters.subcategory && (
                <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                  <span className="mr-1">Subcategory: {filters.subcategory}</span>
                  <button onClick={() => clearFilter("subcategory")} className="text-gray-500 hover:text-gray-700">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {filters.state && (
                <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                  <span className="mr-1">State: {filters.state}</span>
                  <button onClick={() => clearFilter("state")} className="text-gray-500 hover:text-gray-700">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {filters.city && (
                <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                  <span className="mr-1">City: {filters.city}</span>
                  <button onClick={() => clearFilter("city")} className="text-gray-500 hover:text-gray-700">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {filters.location && (
                <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                  <span className="mr-1">Location: {filters.location}</span>
                  <button onClick={() => clearFilter("location")} className="text-gray-500 hover:text-gray-700">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {(filters.minPrice || filters.maxPrice) && (
                <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                  <span className="mr-1">
                    Price: {filters.minPrice ? `$${filters.minPrice}` : "$0"} -{" "}
                    {filters.maxPrice ? `$${filters.maxPrice}` : "Any"}
                  </span>
                  <button
                    onClick={() => {
                      clearFilter("minPrice")
                      clearFilter("maxPrice")
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {filters.listingType.length > 0 && (
                <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                  <span className="mr-1">Listing: {filters.listingType.join(", ")}</span>
                  <button onClick={() => clearFilter("listingType")} className="text-gray-500 hover:text-gray-700">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {filters.rentType.length > 0 && (
                <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                  <span className="mr-1">Rent Type: {filters.rentType.join(", ")}</span>
                  <button onClick={() => clearFilter("rentType")} className="text-gray-500 hover:text-gray-700">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {filters.sort !== "newest" && (
                <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                  <span className="mr-1">
                    Sort: {sortOptions.find((opt) => opt.value === filters.sort)?.label || filters.sort}
                  </span>
                  <button
                    onClick={() => handleFilterChange("sort", "newest")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              <button 
                onClick={clearAllFilters} 
                className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}

          {error && currentPage === 1 ? (
            <div className="text-center py-20">
              <p className="text-red-500">{error}</p>
              <button
                onClick={() => setCurrentPage(1)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {products.length === 0 && !loading ? (
                <div className="text-center py-20">
                  <p className="text-gray-500">No products found with the selected filters.</p>
                  {isFilterApplied && (
                    <button
                      onClick={clearAllFilters}
                      className="mt-4 px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((item, index) => (
                    <div key={item.id} ref={index === products.length - 1 ? lastProductElementRef : null}>
                      <HorizontalProductCard
                        item={item}
                        hoveredCard={hoveredCard}
                        setHoveredCard={setHoveredCard}
                        likedItems={likedItems}
                        toggleLike={toggleLike}
                      />
                    </div>
                  ))}
                </div>
              )}

              {loading && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                </div>
              )}

              {!hasMore && products.length > 0 && (
                <div className="text-center py-8 text-gray-500">You've reached the end of the list</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllProducts

