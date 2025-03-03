import HorizontalProductCard from "../horizontalProductCard"

const ProductList = ({
  loading,
  error,
  products,
  currentPage,
  searchQuery,
  hasMore,
  hoveredCard,
  setHoveredCard,
  likedItems,
  toggleLike,
  clearAllFilters,
  setSearchQuery,
  setCurrentPage,
  lastProductElementRef,
  loadingNearby,
  nearbyProducts,
  isNearbyResults,
}) => {
  if (error && currentPage === 1) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => setCurrentPage(1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (loading && currentPage === 1) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (products.length === 0 && !loading) {
    return (
      <div className="space-y-8">
        <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-500">
            {searchQuery ? `No products found for "${searchQuery}"` : "No products found with the selected filters."}
          </p>
          {!searchQuery && (
            <button
              onClick={clearAllFilters}
              className="mt-4 px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Clear All Filters
            </button>
          )}
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("")
                setCurrentPage(1)
              }}
              className="mt-4 px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Nearby Products Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {searchQuery ? "You might also like" : "Nearby Search Results"}
          </h2>
          {loadingNearby ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : nearbyProducts.length > 0 ? (
            <div className="space-y-4">
              {nearbyProducts.map((item) => (
                <div key={item.id}>
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
          ) : (
            <p className="text-gray-500 text-center py-4">No nearby products found.</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {isNearbyResults && searchQuery && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          <p>Showing related results for "{searchQuery}"</p>
        </div>
      )}
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

      {loading && currentPage > 1 && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <div className="text-center py-8 text-gray-500">You've reached the end of the list</div>
      )}
    </div>
  )
}

export default ProductList 