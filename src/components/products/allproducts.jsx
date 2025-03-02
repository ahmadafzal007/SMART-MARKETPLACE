"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import { filterProducts } from "../../api/filterProductsApi"
import { searchProducts } from "../../api/searchapi"
import { SlidersHorizontal, ArrowUpDown } from "lucide-react"
import Navbar from "../home/navbar/navbar"

// Import components
import ProductFilters from "./components/ProductFilters"
import ActiveFilters from "./components/ActiveFilters"
import ProductList from "./components/ProductList"

// Import constants
import {
  categories,
  australianStates,
  listingTypes,
  rentTypes,
  sortOptions,
  citiesByState,
} from "./constants/productConstants"

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
  
  // Search state
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [isSearchResults, setIsSearchResults] = useState(false)
  const [isNearbyResults, setIsNearbyResults] = useState(false)
  const [nearbyProducts, setNearbyProducts] = useState([])
  const [loadingNearby, setLoadingNearby] = useState(false)

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

  // Helper function to compute relative time
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

  // Load products based on filters or search query
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        setProducts(currentPage === 1 ? [] : products)
        setIsNearbyResults(false)

        if (searchQuery) {
          setIsSearchResults(true)
          const data = await searchProducts(searchQuery, currentPage, 20)
          
          if (data.noResults) {
            setProducts([])
            setPagination({
              currentPage: 1,
              totalPages: 1,
              totalItems: 0,
            })
            setHasMore(false)
            return
          }

          if (data.isNearbyResults) {
            setIsNearbyResults(true)
          }

          if (!data.products || !Array.isArray(data.products)) {
            throw new Error("Invalid response format")
          }

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
          return
        }

        setIsSearchResults(false)

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

        if (filters.listingType.length > 0) {
          filterParams.listingType = filters.listingType
        }

        if (filters.rentType.length > 0) {
          filterParams.rentType = filters.rentType
        }

        const data = await filterProducts(filterParams)

        if (!data.products || !Array.isArray(data.products)) {
          throw new Error("Invalid response format")
        }

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
  }, [currentPage, filters, timeAgo, searchQuery])

  // Update URL search params when filters or search query change
  useEffect(() => {
    const newSearchParams = new URLSearchParams()

    newSearchParams.set("page", currentPage.toString())
    if (searchQuery) newSearchParams.set("search", searchQuery)
    if (filters.subcategory) newSearchParams.set("subcategory", filters.subcategory)
    if (filters.state) newSearchParams.set("state", filters.state)
    if (filters.city) newSearchParams.set("city", filters.city)
    if (filters.minPrice) newSearchParams.set("minPrice", filters.minPrice)
    if (filters.maxPrice) newSearchParams.set("maxPrice", filters.maxPrice)
    if (filters.location) newSearchParams.set("location", filters.location)
    if (filters.sort) newSearchParams.set("sort", filters.sort)

    if (filters.listingType.length === 1) {
      newSearchParams.set("listingType", filters.listingType[0])
    }

    if (filters.rentType.length === 1) {
      newSearchParams.set("rentType", filters.rentType[0])
    }

    setSearchParams(newSearchParams)
  }, [filters, currentPage, searchQuery, setSearchParams])

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
    if (currentPage !== 1) {
      setCurrentPage(1)
    }

    setFilters((prev) => {
      if (filterName === "listingType") {
        const currentValues = [...prev[filterName]]
        const valueIndex = currentValues.indexOf(value)

        if (valueIndex === -1) {
          currentValues.push(value)
        } else {
          currentValues.splice(valueIndex, 1)
        }

        if (value === 'rent' && valueIndex !== -1) {
          return {
            ...prev,
            listingType: currentValues,
            rentType: []
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

      if (filterName === "category" && value !== prev.category) {
        return {
          ...prev,
          category: value,
          subcategory: "",
        }
      }

      if (filterName === "state" && value !== prev.state) {
        return {
          ...prev,
          state: value,
          city: "",
        }
      }

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

  const handleLocationChange = (newState) => {
    setCurrentPage(1)
    
    setFilters(prev => {
      const newFilters = { ...prev }
      if (newState) {
        newFilters.state = newState
      } else {
        delete newFilters.state
      }
      return newFilters
    })

    const newParams = new URLSearchParams(searchParams)
    newParams.set('page', '1')
    if (newState) {
      newParams.set('state', newState)
    } else {
      newParams.delete('state')
    }
    setSearchParams(newParams)
  }

  const fetchNearbyProducts = async () => {
    try {
      setLoadingNearby(true)
      const relaxedFilters = {
        ...filters,
        category: '',
        subcategory: '',
        minPrice: '',
        maxPrice: '',
        page: 1,
        limit: 10
      }
      
      const data = await filterProducts(relaxedFilters)
      if (data.products && Array.isArray(data.products)) {
        const transformed = data.products.map((product) => ({
          id: product._id,
          image: product.images[0],
          title: product.title,
          price: product.price,
          listingType: product.listingType,
          rentType: product.rentType,
          location: `${product.city}, ${product.state}`,
          time: timeAgo(new Date(product.createdAt)),
        }))
        setNearbyProducts(transformed)
      }
    } catch (err) {
      console.error("Failed to load nearby products:", err)
    } finally {
      setLoadingNearby(false)
    }
  }

  useEffect(() => {
    if (products.length === 0 && !loading && !error) {
      fetchNearbyProducts()
    }
  }, [products, loading, error])

  const handleSearchUpdate = (query) => {
    setSearchQuery(query)
    setCurrentPage(1)
    
    const stateMatch = query.match(/in\s+(South\s+Australia|New\s+South\s+Wales|Western\s+Australia|Northern\s+Territory|Australian\s+Capital\s+Territory|Queensland|Victoria|Tasmania)(?:\s*$|[,\s])/i)
    
    const stateFromQuery = stateMatch ? stateMatch[1] : null
    
    const categoryMatch = query.match(/(.+?)\s+in\s+(.+?)(?:\s+in\s+|$)/i)
    let categoryFromQuery = null
    let subcategoryFromQuery = null
    
    if (categoryMatch && !stateMatch) {
      const potentialSubcategory = categoryMatch[1].trim()
      const potentialCategory = categoryMatch[2].trim()
      
      if (Object.keys(categories).includes(potentialCategory)) {
        categoryFromQuery = potentialCategory
        subcategoryFromQuery = potentialSubcategory
      }
    }
    
    setFilters({
      category: categoryFromQuery || "",
      subcategory: subcategoryFromQuery || "",
      state: stateFromQuery || "",
      city: "",
      listingType: [],
      rentType: [],
      minPrice: "0",
      maxPrice: "100000000",
      location: "",
      sort: "newest",
    })
  }

  return (
    <>
      <Navbar onLocationChange={handleLocationChange} onSearch={handleSearchUpdate} />
      <div className="max-w-[1400px] md:mt-8 mx-auto px-4 sm:px-6 lg:px-8 py-6 font-['Plus_Jakarta_Sans']">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight font-['Inter']">
            {searchQuery ? `Search results for "${searchQuery}"` : filters.category || formatCategoryName(category)}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {searchQuery 
              ? `Found ${pagination.totalItems} results${isNearbyResults ? ' (showing related items)' : ''}`
              : `Browse all ${(filters.category || formatCategoryName(category)).toLowerCase()} listings
                ${!loading && products.length > 0 ? ` (${pagination.totalItems} items)` : ''}`
            }
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
          {/* Filters sidebar */}
          <div className={`${showFilters ? "block" : "hidden lg:block"}`}>
            <ProductFilters
              filters={filters}
              handleFilterChange={handleFilterChange}
              clearFilter={clearFilter}
              clearAllFilters={clearAllFilters}
              categories={categories}
              australianStates={australianStates}
              citiesByState={citiesByState}
              listingTypes={listingTypes}
              rentTypes={rentTypes}
              sortOptions={sortOptions}
              availableSubcategories={availableSubcategories}
              isFilterApplied={isFilterApplied}
            />
          </div>

          {/* Products section */}
          <div className="flex-1">
            <ActiveFilters
              filters={filters}
              clearFilter={clearFilter}
              clearAllFilters={clearAllFilters}
              sortOptions={sortOptions}
              isFilterApplied={isFilterApplied}
            />

            <ProductList
              loading={loading}
              error={error}
              products={products}
              currentPage={currentPage}
              searchQuery={searchQuery}
              hasMore={hasMore}
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
              likedItems={likedItems}
              toggleLike={toggleLike}
              clearAllFilters={clearAllFilters}
              setSearchQuery={setSearchQuery}
              setCurrentPage={setCurrentPage}
              lastProductElementRef={lastProductElementRef}
              loadingNearby={loadingNearby}
              nearbyProducts={nearbyProducts}
              isNearbyResults={isNearbyResults}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default AllProducts

