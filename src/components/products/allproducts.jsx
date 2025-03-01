import { useState, useEffect, useRef, useCallback } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { fetchProductsByCategory } from "../../api/productapi"
import ProductCard from "../home/productCard"

const AllProducts = () => {
  const { category } = useParams()
  const [searchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") || "1", 10))
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef()
  
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

  // Helper function to compute relative time (e.g., "2 days ago")
  const timeAgo = (date) => {
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
  }

  // Last element ref callback for infinite scrolling
  const lastProductElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setCurrentPage(prevPage => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchProductsByCategory(category, currentPage)

        if (!data.products || !Array.isArray(data.products)) {
          throw new Error('Invalid response format')
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

        setProducts(prev => currentPage === 1 ? transformedProducts : [...prev, ...transformedProducts])
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
  }, [category, currentPage])

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
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 font-['Plus_Jakarta_Sans']">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight font-['Inter']">
          {formatCategoryName(category)}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Browse all {formatCategoryName(category).toLowerCase()} listings
          {!loading && products.length > 0 && ` (${pagination.totalItems} items)`}
        </p>
      </div>

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
              <p className="text-gray-500">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((item, index) => (
                <div
                  key={item.id}
                  ref={index === products.length - 1 ? lastProductElementRef : null}
                >
                  <ProductCard
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
            <div className="text-center py-8 text-gray-500">
              You've reached the end of the list
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AllProducts

